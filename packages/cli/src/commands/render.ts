import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import type { GraphInstance, ExportFormat } from '@brepflow/types';
import { GraphManager, DAGEngine } from '@brepflow/engine-core';
import { registerCoreNodes } from '@brepflow/nodes-core';
import { getGeometryAPI } from '@brepflow/engine-occt';

export const renderCommand = new Command('render')
  .description('Render a BrepFlow graph and export results')
  .argument('<graph>', 'path to .bflow.json graph file')
  .option('-o, --out <dir>', 'output directory', './output')
  .option('-e, --export <formats>', 'export formats (step,stl,obj)', 'step,stl')
  .option('-s, --set <params...>', 'set parameter values (e.g., --set L=120 W=80)')
  .option('--quality <level>', 'tessellation quality (low,medium,high)', 'medium')
  .option('--hash', 'include content hash in filenames')
  .option('--manifest', 'generate manifest.json with metadata')
  .option('--mock', 'use mock geometry (for testing)', false)
  .action(async (graphPath, options) => {
    const spinner = ora('Loading graph...').start();

    try {
      // Check if graph file exists
      if (!await fs.pathExists(graphPath)) {
        spinner.fail(`Graph file not found: ${graphPath}`);
        process.exit(1);
      }

      // Load graph
      const graphContent = await fs.readFile(graphPath, 'utf-8');
      const graph: GraphInstance = JSON.parse(graphContent);
      spinner.succeed('Graph loaded');

      // Register core nodes
      registerCoreNodes();

      // Apply parameter overrides
      if (options.set) {
        spinner.start('Applying parameters...');
        applyParameters(graph, options.set);
        spinner.succeed('Parameters applied');
      }

      // Initialize geometry API
      spinner.start('Initializing geometry engine...');
      const geometryAPI = getGeometryAPI(options.mock);
      await geometryAPI.init();
      spinner.succeed(options.mock ? 'Mock geometry initialized' : 'Geometry engine initialized');

      // Create graph manager and DAG engine
      const graphManager = new GraphManager(graph);
      const dagEngine = new DAGEngine({
        worker: geometryAPI,
      });

      // Evaluate graph
      spinner.start('Evaluating graph...');
      const startTime = Date.now();

      const dirtyNodes = graphManager.getDirtyNodes();
      await dagEngine.evaluate(graph, dirtyNodes);

      const evalTime = Date.now() - startTime;
      spinner.succeed(`Graph evaluated in ${evalTime}ms`);

      // Create output directory
      const outputDir = path.resolve(options.out);
      await fs.ensureDir(outputDir);

      // Export results
      const formats = options.export.split(',') as ExportFormat[];
      const exportResults: any[] = [];

      for (const format of formats) {
        spinner.start(`Exporting ${format.toUpperCase()}...`);

        try {
          const result = await exportFormat(graph, format, outputDir, options);
          exportResults.push(result);
          spinner.succeed(`Exported ${result.filename}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          spinner.warn(`Failed to export ${format}: ${errorMessage}`);
        }
      }

      // Generate manifest if requested
      if (options.manifest) {
        spinner.start('Generating manifest...');
        const manifest = {
          graph: path.basename(graphPath),
          timestamp: new Date().toISOString(),
          units: graph.units,
          tolerance: graph.tolerance,
          parameters: options.set || [],
          exports: exportResults,
          evaluationTime: evalTime,
          mockGeometry: options.mock,
        };

        await fs.writeJson(path.join(outputDir, 'manifest.json'), manifest, { spaces: 2 });
        spinner.succeed('Manifest generated');
      }

      console.log(chalk.green('\n✅ Rendering complete!'));
      console.log(chalk.gray(`Output directory: ${outputDir}`));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      spinner.fail(`Error: ${errorMessage}`);
      if (options.verbose) {
        console.error(error);
      }
      process.exit(1);
    }
  });

/**
 * Apply parameter overrides to graph
 */
function applyParameters(graph: GraphInstance, params: string[]): void {
  const paramMap = new Map<string, any>();

  // Parse parameters
  for (const param of params) {
    const [key, value] = param.split('=');
    if (key && value) {
      // Try to parse as number
      const numValue = parseFloat(value);
      paramMap.set(key, isNaN(numValue) ? value : numValue);
    }
  }

  // Apply to nodes
  for (const node of graph.nodes) {
    for (const [paramName, paramValue] of Object.entries(node.params || {})) {
      // Check for global parameter reference (e.g., @L, @W)
      if (typeof paramValue === 'string' && paramValue.startsWith('@')) {
        const globalName = paramValue.substring(1);
        if (paramMap.has(globalName)) {
          node.params[paramName] = paramMap.get(globalName);
          node.dirty = true;
        }
      }
      // Check for direct parameter match
      else if (paramMap.has(`${node.id}.${paramName}`)) {
        node.params[paramName] = paramMap.get(`${node.id}.${paramName}`);
        node.dirty = true;
      }
    }
  }
}

/**
 * Export graph in specified format
 */
async function exportFormat(
  graph: GraphInstance,
  format: ExportFormat,
  outputDir: string,
  options: any
): Promise<any> {
  // Find output nodes
  const outputNodes = graph.nodes.filter(n =>
    n.type.includes('Export') ||
    (n.outputs && Object.keys(n.outputs).length > 0)
  );

  if (outputNodes.length === 0) {
    throw new Error('No output nodes found in graph');
  }

  // Generate filename
  const timestamp = Date.now();
  const hash = options.hash ? `-${timestamp.toString(36)}` : '';
  const filename = `output${hash}.${format}`;
  const filepath = path.join(outputDir, filename);

  // Mock export for now
  if (format === 'step' || format === 'stl') {
    // Create mock file
    const mockContent = `# BrepFlow Export\n# Format: ${format.toUpperCase()}\n# Generated: ${new Date().toISOString()}\n# Mock geometry\n`;
    await fs.writeFile(filepath, mockContent);
  }

  return {
    format,
    filename,
    filepath,
    size: (await fs.stat(filepath)).size,
  };
}