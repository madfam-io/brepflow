/**
 * Script Engine Implementation
 * Main orchestrator for script compilation, execution, and management
 */

import {
  ScriptEngine,
  ScriptLanguage,
  ScriptExecutor,
  ScriptSandbox,
  ScriptPermissions,
  ScriptTemplate,
  ScriptMetadata,
  ScriptedNodeDefinition,
  ScriptExecutionResult,
  ScriptValidationResult,
  ScriptMetric,
  CompiledScript,
  ScriptContext,
  ScriptExecutionError,
  ScriptValidationError,
} from './types';
import { JavaScriptExecutor } from './javascript-executor';
import { NodeId } from '@brepflow/types';

interface ScriptCacheEntry {
  compiledScript: CompiledScript;
  definition: ScriptedNodeDefinition;
  lastAccessed: number;
  accessCount: number;
}

export class BrepFlowScriptEngine implements ScriptEngine {
  private executors: Map<ScriptLanguage, ScriptExecutor> = new Map();
  private sandboxes: Map<string, ScriptSandbox> = new Map();
  private templates: Map<string, ScriptTemplate> = new Map();
  private scriptCache: Map<string, ScriptCacheEntry> = new Map();
  private executionMetrics: Map<NodeId, ScriptMetric[]> = new Map();
  private nodeDefinitions: Map<NodeId, ScriptedNodeDefinition> = new Map();

  constructor() {
    this.initializeDefaultExecutors();
    this.initializeDefaultTemplates();
  }

  // Language Management
  registerLanguage(language: ScriptLanguage, executor: ScriptExecutor): void {
    this.executors.set(language, executor);
  }

  getSupportedLanguages(): ScriptLanguage[] {
    return Array.from(this.executors.keys());
  }

  // Sandbox Management
  async createSandbox(permissions: ScriptPermissions): Promise<ScriptSandbox> {
    const sandboxId = `sandbox_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const sandbox = new ScriptSandboxImpl(
      sandboxId,
      permissions,
      this.executors,
      this.executionMetrics
    );

    this.sandboxes.set(sandboxId, sandbox);
    return sandbox;
  }

  async destroySandbox(sandbox: ScriptSandbox): Promise<void> {
    if (sandbox instanceof ScriptSandboxImpl) {
      await sandbox.dispose();
      this.sandboxes.delete(sandbox.getId());
    }
  }

  // Node Generation and Management
  async compileNodeFromScript(
    script: string,
    metadata: ScriptMetadata,
    permissions: ScriptPermissions
  ): Promise<ScriptedNodeDefinition> {
    const language: ScriptLanguage = 'javascript'; // Default to JavaScript for now
    const executor = this.executors.get(language);

    if (!executor) {
      throw new ScriptValidationError(
        `No executor found for language: ${language}`,
        []
      );
    }

    // Validate script
    const validationResult = await executor.validate(script);
    if (!validationResult.valid) {
      throw new ScriptValidationError(
        'Script validation failed',
        validationResult.errors
      );
    }

    // Compile script if executor supports it
    let compiled: CompiledScript | undefined;
    if (executor.compile) {
      compiled = await executor.compile(script);
    }

    // Generate node definition
    const nodeDefinition: ScriptedNodeDefinition = {
      id: `Script::${metadata.name}`,
      type: `Script::${metadata.name}`,
      category: metadata.category,
      label: metadata.name,
      description: metadata.description,

      // Script-specific properties
      script,
      scriptLanguage: language,
      metadata,
      permissions,
      compiledAt: new Date(),
      compiledBy: 'system', // In real implementation, use current user
      hash: await this.hashScript(script),

      config: {
        cacheable: true,
        parallelizable: false, // Scripts are generally not parallelizable
        deterministicOutput: true,
        maxExecutionTime: permissions.timeoutMS,
        memoryLimit: permissions.memoryLimitMB * 1024 * 1024,
      },

      // Inputs and outputs will be inferred from script
      inputs: this.inferInputsFromScript(script),
      outputs: this.inferOutputsFromScript(script),
      params: this.inferParamsFromScript(script),

      // Enhanced evaluate function
      evaluate: async (ctx: ScriptContext, inputs: any, params: any) => {
        const sandbox = await this.createSandbox(permissions);
        try {
          const result = await sandbox.execute(script, ctx, permissions);

          if (!result.success) {
            throw new ScriptExecutionError(
              result.error?.message || 'Script execution failed',
              ctx.runtime.nodeId,
              undefined,
              undefined,
              result.error
            );
          }

          // Record metrics
          this.recordExecutionMetrics(ctx.runtime.nodeId, result);

          return result.outputs;
        } finally {
          await this.destroySandbox(sandbox);
        }
      },

      // Lifecycle hooks
      onInitialize: async (ctx: ScriptContext) => {
        // Custom initialization logic can be added here
        ctx.script.log('Script node initialized', 'info');
      },

      onDispose: async (ctx: ScriptContext) => {
        // Cleanup logic
        ctx.script.log('Script node disposed', 'info');
      },

      onParameterChange: async (
        ctx: ScriptContext,
        paramName: string,
        oldValue: any,
        newValue: any
      ) => {
        ctx.script.log(
          `Parameter ${paramName} changed from ${oldValue} to ${newValue}`,
          'info'
        );
      },
    };

    // Cache the compiled node
    const cacheKey = this.getCacheKey(script, metadata);
    this.scriptCache.set(cacheKey, {
      compiledScript: compiled || { dependencies: [], entryPoint: 'main' },
      definition: nodeDefinition,
      lastAccessed: Date.now(),
      accessCount: 1,
    });

    this.nodeDefinitions.set(nodeDefinition.id as NodeId, nodeDefinition);

    return nodeDefinition;
  }

  async updateNodeScript(
    nodeId: NodeId,
    script: string
  ): Promise<ScriptedNodeDefinition> {
    const existingNode = this.nodeDefinitions.get(nodeId);
    if (!existingNode) {
      throw new Error(`Node not found: ${nodeId}`);
    }

    // Update the script and recompile
    const updatedNode = await this.compileNodeFromScript(
      script,
      existingNode.metadata,
      existingNode.permissions
    );

    // Update the stored definition
    this.nodeDefinitions.set(nodeId, updatedNode);

    return updatedNode;
  }

  // Template Management
  getTemplates(category?: string): ScriptTemplate[] {
    const templates = Array.from(this.templates.values());
    return category ? templates.filter(t => t.category === category) : templates;
  }

  registerTemplate(template: ScriptTemplate): void {
    this.templates.set(template.name, template);
  }

  // Security and Validation
  async validatePermissions(
    permissions: ScriptPermissions,
    script: string
  ): Promise<ScriptValidationResult> {
    const errors: any[] = [];
    const warnings: any[] = [];

    // Check for file system access
    if (!permissions.allowFileSystem && (script.includes('fs.') || script.includes('require('))) {
      warnings.push({
        line: 1,
        column: 1,
        message: 'Script attempts to access file system but permission not granted',
        severity: 'warning',
        code: 'PERMISSION_FILESYSTEM',
      });
    }

    // Check for network access
    if (!permissions.allowNetworkAccess && (script.includes('fetch(') || script.includes('XMLHttpRequest'))) {
      warnings.push({
        line: 1,
        column: 1,
        message: 'Script attempts network access but permission not granted',
        severity: 'warning',
        code: 'PERMISSION_NETWORK',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  // Performance Monitoring
  getExecutionMetrics(nodeId: NodeId): ScriptMetric[] {
    return this.executionMetrics.get(nodeId) || [];
  }

  clearExecutionMetrics(nodeId?: NodeId): void {
    if (nodeId) {
      this.executionMetrics.delete(nodeId);
    } else {
      this.executionMetrics.clear();
    }
  }

  // Private Methods
  private initializeDefaultExecutors(): void {
    this.registerLanguage('javascript', new JavaScriptExecutor());
    // Add Python and Lua executors in the future
  }

  private initializeDefaultTemplates(): void {
    // Basic JavaScript templates
    this.registerTemplate({
      name: 'Empty Script',
      description: 'Basic empty script template',
      language: 'javascript',
      category: 'Basic',
      template: `
async function evaluate(ctx, inputs, params) {
  // Your code here

  return {
    // outputs
  };
}
      `.trim(),
      placeholders: {},
      requiredPermissions: {
        allowGeometryAPI: true,
        timeoutMS: 5000,
        memoryLimitMB: 100,
      },
    });

    this.registerTemplate({
      name: 'Geometry Transformer',
      description: 'Transform input geometry with parameters',
      language: 'javascript',
      category: 'Geometry',
      template: `
async function evaluate(ctx, inputs, params) {
  const shape = ctx.script.getInput('shape');
  const {{PARAM_NAME}} = ctx.script.getParameter('{{PARAM_NAME}}', {{DEFAULT_VALUE}});

  if (!shape) {
    throw new Error('Input shape is required');
  }

  const result = await ctx.geom.invoke('{{OPERATION}}', {
    shape: shape,
    {{PARAM_NAME}}: {{PARAM_NAME}}
  });

  return { result };
}
      `.trim(),
      placeholders: {
        PARAM_NAME: 'distance',
        DEFAULT_VALUE: '10',
        OPERATION: 'MAKE_EXTRUDE',
      },
      requiredPermissions: {
        allowGeometryAPI: true,
        timeoutMS: 10000,
        memoryLimitMB: 200,
      },
    });

    this.registerTemplate({
      name: 'Array Generator',
      description: 'Generate multiple geometries based on patterns',
      language: 'javascript',
      category: 'Arrays',
      template: `
async function evaluate(ctx, inputs, params) {
  const baseShape = ctx.script.getInput('shape');
  const count = ctx.script.getParameter('count', 5);
  const spacing = ctx.script.getParameter('spacing', 10);

  const results = [];

  for (let i = 0; i < count; i++) {
    const offset = i * spacing;
    const transformed = await ctx.geom.invoke('TRANSFORM', {
      shape: baseShape,
      translation: ctx.script.createVector(offset, 0, 0)
    });

    results.push(transformed);
  }

  return { shapes: results };
}
      `.trim(),
      placeholders: {},
      requiredPermissions: {
        allowGeometryAPI: true,
        timeoutMS: 30000,
        memoryLimitMB: 500,
      },
    });
  }

  private async hashScript(script: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(script);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private getCacheKey(script: string, metadata: ScriptMetadata): string {
    return `${metadata.name}_${metadata.version}_${script.length}`;
  }

  private inferInputsFromScript(script: string): Record<string, any> {
    const inputs: Record<string, any> = {};

    // Look for getInput calls to infer input sockets
    const inputMatches = script.matchAll(/getInput\(['"`]([^'"`]+)['"`]\)/g);
    for (const match of inputMatches) {
      inputs[match[1]] = { type: 'any' };
    }

    return inputs;
  }

  private inferOutputsFromScript(script: string): Record<string, any> {
    const outputs: Record<string, any> = {};

    // Look for setOutput calls and return statements
    const outputMatches = script.matchAll(/setOutput\(['"`]([^'"`]+)['"`]/g);
    for (const match of outputMatches) {
      outputs[match[1]] = { type: 'any' };
    }

    // Also look for return object properties
    const returnMatches = script.matchAll(/return\s*\{\s*([^}]+)\}/g);
    for (const match of returnMatches) {
      const properties = match[1].split(',');
      properties.forEach(prop => {
        const name = prop.split(':')[0].trim();
        outputs[name] = { type: 'any' };
      });
    }

    return outputs;
  }

  private inferParamsFromScript(script: string): Record<string, any> {
    const params: Record<string, any> = {};

    // Look for getParameter calls to infer parameters
    const paramMatches = script.matchAll(/getParameter\(['"`]([^'"`]+)['"`](?:,\s*([^)]+))?\)/g);
    for (const match of paramMatches) {
      const paramName = match[1];
      const defaultValue = match[2];

      // Infer type from default value
      let type = 'string';
      if (defaultValue) {
        if (!isNaN(Number(defaultValue))) {
          type = 'number';
        } else if (defaultValue === 'true' || defaultValue === 'false') {
          type = 'boolean';
        }
      }

      params[paramName] = {
        type,
        label: paramName.charAt(0).toUpperCase() + paramName.slice(1),
        default: defaultValue ? JSON.parse(defaultValue) : undefined,
      };
    }

    return params;
  }

  private recordExecutionMetrics(nodeId: NodeId, result: ScriptExecutionResult): void {
    const metrics = this.executionMetrics.get(nodeId) || [];

    // Add execution time metric
    metrics.push({
      name: 'execution_time',
      value: result.executionTime,
      unit: 'ms',
      timestamp: Date.now(),
      nodeId,
    });

    // Add memory usage metric
    metrics.push({
      name: 'memory_usage',
      value: result.memoryUsage,
      unit: 'bytes',
      timestamp: Date.now(),
      nodeId,
    });

    // Keep only recent metrics (last 100)
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100);
    }

    this.executionMetrics.set(nodeId, metrics);
  }
}

// Sandbox Implementation
class ScriptSandboxImpl implements ScriptSandbox {
  constructor(
    private id: string,
    private permissions: ScriptPermissions,
    private executors: Map<ScriptLanguage, ScriptExecutor>,
    private metricsStore: Map<NodeId, ScriptMetric[]>
  ) {}

  getId(): string {
    return this.id;
  }

  async execute(
    script: string,
    context: ScriptContext,
    permissions: ScriptPermissions
  ): Promise<ScriptExecutionResult> {
    const executor = this.executors.get('javascript'); // Default to JavaScript
    if (!executor) {
      throw new Error('No JavaScript executor available');
    }

    return executor.execute(script, context, permissions);
  }

  async validate(script: string): Promise<ScriptValidationResult> {
    const executor = this.executors.get('javascript');
    if (!executor) {
      throw new Error('No JavaScript executor available');
    }

    return executor.validate(script);
  }

  async dispose(): Promise<void> {
    // Cleanup sandbox resources
  }

  async updateScript(script: string): Promise<void> {
    // Update script in sandbox (for hot reload)
  }

  setBreakpoint(line: number): void {
    // Set debugging breakpoint
  }

  removeBreakpoint(line: number): void {
    // Remove debugging breakpoint
  }

  async step(): Promise<void> {
    // Debug step execution
  }

  async continue(): Promise<void> {
    // Debug continue execution
  }
}

// Export singleton instance
export const scriptEngine = new BrepFlowScriptEngine();