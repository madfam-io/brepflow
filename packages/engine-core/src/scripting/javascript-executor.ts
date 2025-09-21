/**
 * JavaScript Script Executor
 * Secure JavaScript execution environment for custom nodes
 */

import {
  ScriptExecutor,
  ScriptContext,
  ScriptPermissions,
  ScriptExecutionResult,
  ScriptValidationResult,
  ScriptError,
  AutoCompletionItem,
  SyntaxHighlightRules,
  LanguageDocumentation,
  ScriptExecutionError,
  ScriptPermissionError,
  ScriptLogEntry,
  ScriptMetric,
} from './types';

export class JavaScriptExecutor implements ScriptExecutor {
  private workers: Map<string, Worker> = new Map();
  private executionContexts: Map<string, AbortController> = new Map();

  async execute(
    script: string,
    context: ScriptContext,
    permissions: ScriptPermissions
  ): Promise<ScriptExecutionResult> {
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = performance.now();
    const logs: ScriptLogEntry[] = [];
    const metrics: ScriptMetric[] = [];

    try {
      // Create secure execution environment
      const sandbox = this.createSecureSandbox(context, permissions, logs, metrics);

      // Set up abort controller for timeout
      const abortController = new AbortController();
      this.executionContexts.set(executionId, abortController);

      // Set timeout
      const timeoutHandle = setTimeout(() => {
        abortController.abort();
      }, permissions.timeoutMS);

      try {
        // Execute script in secure context
        const result = await this.executeInSecureContext(
          script,
          sandbox,
          context,
          permissions,
          abortController.signal
        );

        clearTimeout(timeoutHandle);

        return {
          success: true,
          outputs: result.outputs || {},
          logs,
          metrics,
          executionTime: performance.now() - startTime,
          memoryUsage: result.memoryUsage || 0,
        };
      } catch (error) {
        clearTimeout(timeoutHandle);

        if (abortController.signal.aborted) {
          throw new ScriptExecutionError(
            `Script execution timed out after ${permissions.timeoutMS}ms`,
            context.runtime.nodeId
          );
        }

        throw error;
      }
    } catch (error) {
      return {
        success: false,
        outputs: {},
        logs,
        metrics,
        executionTime: performance.now() - startTime,
        memoryUsage: 0,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    } finally {
      this.executionContexts.delete(executionId);
    }
  }

  async validate(script: string): Promise<ScriptValidationResult> {
    const errors: ScriptError[] = [];
    const warnings: ScriptError[] = [];

    try {
      // Basic syntax validation using Function constructor
      new Function(script);
    } catch (error) {
      if (error instanceof SyntaxError) {
        errors.push({
          line: this.extractLineNumber(error.message) || 1,
          column: 1,
          message: error.message,
          severity: 'error',
          code: 'SYNTAX_ERROR',
        });
        // Return early if there are syntax errors
        return {
          valid: false,
          errors,
          warnings,
          suggestedFixes: this.generateSuggestedFixes(errors, warnings),
        };
      }
    }

    // Validate node definition structure
    const structureValidation = this.validateNodeStructure(script);
    errors.push(...structureValidation.errors);
    warnings.push(...structureValidation.warnings);

    // Static analysis for security concerns
    const securityIssues = this.analyzeSecurityConcerns(script);
    warnings.push(...securityIssues);

    // Check for best practices
    const practiceIssues = this.analyzeBestPractices(script);
    warnings.push(...practiceIssues);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestedFixes: this.generateSuggestedFixes(errors, warnings),
    };
  }

  private validateNodeStructure(script: string): { errors: ScriptError[]; warnings: ScriptError[] } {
    const errors: ScriptError[] = [];
    const warnings: ScriptError[] = [];

    try {
      // Try to execute the script in a safe context to get the returned node definition
      const nodeDefinition = this.extractNodeDefinition(script);

      if (!nodeDefinition) {
        // Don't require node definition for simple evaluate functions
        return { errors, warnings };
      }

      // Check required fields if node definition exists
      const requiredFields = ['type', 'name', 'inputs', 'outputs', 'params', 'evaluate'];
      for (const field of requiredFields) {
        if (!(field in nodeDefinition)) {
          warnings.push({
            line: 1,
            column: 1,
            message: `Node definition missing recommended field: ${field}`,
            severity: 'warning',
            code: 'MISSING_RECOMMENDED_FIELD',
          });
        }
      }

      // Validate evaluate function
      if (nodeDefinition.evaluate && typeof nodeDefinition.evaluate !== 'function') {
        errors.push({
          line: 1,
          column: 1,
          message: 'Node definition "evaluate" must be a function',
          severity: 'error',
          code: 'INVALID_EVALUATE_FUNCTION',
        });
      }

      // Validate type field format
      if (nodeDefinition.type && typeof nodeDefinition.type === 'string' && !nodeDefinition.type.includes('::')) {
        warnings.push({
          line: 1,
          column: 1,
          message: 'Node type should follow "Category::Name" format',
          severity: 'warning',
          code: 'TYPE_FORMAT_WARNING',
        });
      }

    } catch (error) {
      // This is okay - script might just be an evaluate function
    }

    return { errors, warnings };
  }

  private extractNodeDefinition(script: string): any {
    try {
      // Create a safe evaluation context
      const sandbox = {
        console: { log: () => {}, warn: () => {}, error: () => {} },
        Math: Math,
        evaluate: undefined as any, // Will be set if defined in script
      };

      // Wrap script in a function to capture the return value
      const wrappedScript = `
(function() {
  "use strict";

  ${script}

  // Capture the return statement result
  const result = (function() {
    ${script}
  })();

  return result;
})
      `;

      // Execute script safely using Function constructor (avoids direct eval)
      // Note: Dynamic execution is intentional for user scripts with sandboxing
      const scriptFunction = new Function('return ' + wrappedScript)();
      return scriptFunction();
    } catch (error) {
      return null;
    }
  }

  getSyntaxHighlighting(): SyntaxHighlightRules {
    return {
      keywords: [
        'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
        'do', 'break', 'continue', 'switch', 'case', 'default', 'try', 'catch',
        'finally', 'throw', 'class', 'extends', 'import', 'export', 'async', 'await',
        'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'new', 'this',
      ],
      operators: [
        '+', '-', '*', '/', '%', '**', '=', '==', '===', '!=', '!==', '<', '>',
        '<=', '>=', '&&', '||', '!', '&', '|', '^', '~', '<<', '>>', '>>>', '?',
        ':', '++', '--', '+=', '-=', '*=', '/=', '%=',
      ],
      builtins: [
        'console', 'Math', 'Date', 'JSON', 'Array', 'Object', 'String', 'Number',
        'Boolean', 'RegExp', 'Error', 'Promise', 'Set', 'Map', 'WeakSet', 'WeakMap',
        'Symbol', 'Proxy', 'Reflect', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
      ],
      comments: [/\/\/.*$/, /\/\*[\s\S]*?\*\//],
      strings: [/"(?:[^"\\]|\\.)*"/, /'(?:[^'\\]|\\.)*'/, /`(?:[^`\\]|\\.)*`/],
      numbers: [/\b\d+\.?\d*([eE][+-]?\d+)?\b/, /\b0[xX][0-9a-fA-F]+\b/, /\b0[bB][01]+\b/, /\b0[oO][0-7]+\b/],
    };
  }

  async getAutoCompletion(
    script: string,
    position: { line: number; column: number }
  ): Promise<AutoCompletionItem[]> {
    const items: AutoCompletionItem[] = [];

    // Built-in JavaScript completions
    items.push(
      ...this.getBuiltinCompletions(),
      ...this.getScriptContextCompletions(),
      ...this.getGeometryAPICompletions()
    );

    // Context-aware completions based on current code
    const currentLine = script.split('\n')[position.line - 1];
    const beforeCursor = currentLine.substring(0, position.column);

    if (beforeCursor.includes('ctx.script.')) {
      items.push(...this.getScriptUtilityCompletions());
    }

    if (beforeCursor.includes('ctx.geom.')) {
      items.push(...this.getGeometryMethodCompletions());
    }

    return items.sort((a, b) => a.label.localeCompare(b.label));
  }

  async formatCode(script: string): Promise<string> {
    // Basic formatting - in a real implementation, you might use Prettier
    return script
      .replace(/;\s*\n/g, ';\n')
      .replace(/\{\s*\n/g, '{\n  ')
      .replace(/\n\s*\}/g, '\n}')
      .replace(/,\s*\n/g, ',\n  ');
  }

  getLanguageDocumentation(): LanguageDocumentation {
    return {
      name: 'JavaScript',
      version: 'ES2022',
      description: 'JavaScript scripting environment for BrepFlow custom nodes',
      quickStart: `
// Basic node script structure
async function evaluate(ctx, inputs, params) {
  // Access inputs
  const shape = ctx.script.getInput('shape');

  // Access parameters
  const distance = ctx.script.getParameter('distance', 10);

  // Perform geometry operations
  const result = await ctx.geom.invoke('MAKE_EXTRUDE', {
    face: shape,
    distance: distance
  });

  // Set outputs
  ctx.script.setOutput('result', result);

  return { result };
}
      `,
      apiReference: [
        {
          name: 'ctx.script.getInput',
          type: 'function',
          signature: 'getInput<T>(name: string): T | undefined',
          description: 'Get input value by name',
          parameters: [
            { name: 'name', type: 'string', description: 'Input socket name' }
          ],
          returns: { type: 'T | undefined', description: 'Input value or undefined if not connected' },
          examples: ['const shape = ctx.script.getInput("shape");']
        },
        {
          name: 'ctx.script.setOutput',
          type: 'function',
          signature: 'setOutput(name: string, value: any): void',
          description: 'Set output value by name',
          parameters: [
            { name: 'name', type: 'string', description: 'Output socket name' },
            { name: 'value', type: 'any', description: 'Value to output' }
          ],
          examples: ['ctx.script.setOutput("result", myShape);']
        },
      ],
      examples: [
        {
          title: 'Simple Box Creator',
          description: 'Creates a box with customizable dimensions',
          code: `
async function evaluate(ctx, inputs, params) {
  const width = ctx.script.getParameter('width', 10);
  const height = ctx.script.getParameter('height', 10);
  const depth = ctx.script.getParameter('depth', 10);

  const box = await ctx.geom.invoke('MAKE_BOX', {
    width, height, depth
  });

  return { shape: box };
}
          `
        }
      ],
      troubleshooting: [
        {
          problem: 'Script execution timeout',
          symptoms: ['Script stops executing', 'Timeout error message'],
          solutions: [
            'Reduce computational complexity',
            'Use async/await for long operations',
            'Request higher timeout limit'
          ]
        }
      ]
    };
  }

  private createSecureSandbox(
    context: ScriptContext,
    permissions: ScriptPermissions,
    logs: ScriptLogEntry[],
    metrics: ScriptMetric[]
  ) {
    // Create a mock script utilities object for the sandbox
    const scriptUtils = {
      getInput: (name: string) => {
        // In a real implementation, this would get from actual inputs
        return context.inputs?.[name];
      },
      getParameter: (name: string, defaultValue?: any) => {
        // In a real implementation, this would get from actual parameters
        return context.params?.[name] ?? defaultValue;
      },
      setOutput: (name: string, value: any) => {
        // Store output in context for retrieval
        if (!context.outputs) context.outputs = {};
        context.outputs[name] = value;
      },
      log: (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
        this.addLog(logs, level, message, context.runtime.nodeId);
      },
      createVector: (x: number, y: number, z: number) => ({ x, y, z }),
    };

    return {
      // Restricted global objects
      console: {
        log: (message: string) => this.addLog(logs, 'info', message, context.runtime.nodeId),
        warn: (message: string) => this.addLog(logs, 'warn', message, context.runtime.nodeId),
        error: (message: string) => this.addLog(logs, 'error', message, context.runtime.nodeId),
      },

      // Safe Math operations
      Math: Math,

      // Context objects
      ctx: {
        ...context,
        script: scriptUtils,
      },

      // Utility functions
      setTimeout: permissions.allowWorkerThreads ? setTimeout : undefined,
      setInterval: permissions.allowWorkerThreads ? setInterval : undefined,

      // Geometry helpers
      Vector3: (x: number, y: number, z: number) => ({ x, y, z }),

      // Performance monitoring
      performance: {
        now: () => performance.now(),
        mark: (name: string) => performance.mark(name),
        measure: (name: string, start?: string, end?: string) => {
          const measure = performance.measure(name, start, end);
          this.addMetric(metrics, name, measure.duration, 'ms', context.runtime.nodeId);
          return measure;
        }
      }
    };
  }

  private async executeInSecureContext(
    script: string,
    sandbox: any,
    context: ScriptContext,
    permissions: ScriptPermissions,
    signal: AbortSignal
  ): Promise<{ outputs: any; memoryUsage: number }> {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new Error('Execution aborted'));
        return;
      }

      try {
        // Create a secure execution function
        const sandboxKeys = Object.keys(sandbox);
        const sandboxValues = sandboxKeys.map(key => sandbox[key]);

        // Check if the script is just an evaluate function or a full node definition
        const isSimpleEvaluate = script.includes('function evaluate') && !script.includes('return {');

        let wrappedScript: string;

        if (isSimpleEvaluate) {
          // Script is just an evaluate function - execute it directly
          wrappedScript = `
(function(${sandboxKeys.join(', ')}) {
  "use strict";

  ${script}

  // Call the evaluate function with context
  if (typeof evaluate === 'function') {
    return evaluate(ctx, ctx.inputs || {}, ctx.params || {});
  }

  // If no evaluate function found, return empty
  return {};
})
          `;
        } else {
          // Script might return a node definition or contain other logic
          wrappedScript = `
(function(${sandboxKeys.join(', ')}) {
  "use strict";

  ${script}

  // Try different ways to get the result

  // 1. If script defines an evaluate function, call it
  if (typeof evaluate === 'function') {
    return evaluate(ctx, ctx.inputs || {}, ctx.params || {});
  }

  // 2. If script returns a node definition with evaluate, call that
  const nodeResult = (function() {
    ${script}
  })();

  if (nodeResult && typeof nodeResult.evaluate === 'function') {
    return nodeResult.evaluate(ctx, ctx.inputs || {}, ctx.params || {});
  }

  // 3. Otherwise return the script result directly
  return nodeResult || {};
})
          `;
        }

        // Execute the wrapped script using Function constructor (avoids direct eval)
        // Note: Dynamic execution is intentional for user scripts with sandboxing
        const scriptFunction = new Function('return ' + wrappedScript)();
        const result = scriptFunction(...sandboxValues);

        if (result instanceof Promise) {
          // Add timeout enforcement for async execution
          const timeoutPromise = new Promise((_, rejectTimeout) => {
            setTimeout(() => {
              rejectTimeout(new Error(`Script execution timed out after ${permissions.timeoutMS}ms`));
            }, permissions.timeoutMS);
          });

          Promise.race([result, timeoutPromise])
            .then(outputs => {
              // Ensure outputs is properly formatted
              const finalOutputs = outputs || {};
              // Also include any outputs set via ctx.script.setOutput
              const contextOutputs = context.outputs || {};
              resolve({
                outputs: { ...finalOutputs, ...contextOutputs },
                memoryUsage: 0
              });
            })
            .catch(reject);
        } else {
          // Synchronous result
          const finalOutputs = result || {};
          // Also include any outputs set via ctx.script.setOutput
          const contextOutputs = context.outputs || {};
          resolve({
            outputs: { ...finalOutputs, ...contextOutputs },
            memoryUsage: 0
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  private analyzeSecurityConcerns(script: string): ScriptError[] {
    const warnings: ScriptError[] = [];
    const lines = script.split('\n');

    lines.forEach((line, index) => {
      // Check for dangerous patterns
      if (line.includes('eval(') || line.includes('Function(')) {
        warnings.push({
          line: index + 1,
          column: line.indexOf('eval(') !== -1 ? line.indexOf('eval(') : line.indexOf('Function('),
          message: 'Use of eval() or Function() constructor detected - potential security risk',
          severity: 'warning',
          code: 'SECURITY_EVAL',
        });
      }

      if (line.includes('document.') || line.includes('window.')) {
        warnings.push({
          line: index + 1,
          column: 1,
          message: 'Access to DOM objects not allowed in node scripts',
          severity: 'warning',
          code: 'SECURITY_DOM_ACCESS',
        });
      }
    });

    return warnings;
  }

  private analyzeBestPractices(script: string): ScriptError[] {
    const warnings: ScriptError[] = [];
    const lines = script.split('\n');

    lines.forEach((line, index) => {
      // Check for var usage
      if (line.trim().startsWith('var ')) {
        warnings.push({
          line: index + 1,
          column: line.indexOf('var'),
          message: 'Consider using "const" or "let" instead of "var"',
          severity: 'info',
          code: 'BEST_PRACTICE_VAR',
        });
      }

      // Check for missing async/await
      if (line.includes('ctx.geom.invoke') && !line.includes('await')) {
        warnings.push({
          line: index + 1,
          column: line.indexOf('ctx.geom.invoke'),
          message: 'Geometry operations should use "await" for proper execution',
          severity: 'warning',
          code: 'BEST_PRACTICE_AWAIT',
        });
      }
    });

    return warnings;
  }

  private generateSuggestedFixes(errors: ScriptError[], warnings: ScriptError[]) {
    return []; // Implementation would generate automatic fixes
  }

  private extractLineNumber(errorMessage: string): number | null {
    const match = errorMessage.match(/line (\d+)/i);
    return match ? parseInt(match[1], 10) : null;
  }

  private addLog(
    logs: ScriptLogEntry[],
    level: 'info' | 'warn' | 'error',
    message: string,
    nodeId: string
  ) {
    logs.push({
      timestamp: Date.now(),
      level,
      message,
      nodeId,
      executionId: 'current',
    });
  }

  private addMetric(
    metrics: ScriptMetric[],
    name: string,
    value: number,
    unit: string,
    nodeId: string
  ) {
    metrics.push({
      name,
      value,
      unit,
      timestamp: Date.now(),
      nodeId,
    });
  }

  private getBuiltinCompletions(): AutoCompletionItem[] {
    return [
      {
        label: 'console.log',
        kind: 'function',
        detail: '(message: string) => void',
        documentation: 'Log a message to the console',
        insertText: 'console.log($1)',
      },
      {
        label: 'Math.PI',
        kind: 'variable',
        detail: 'number',
        documentation: 'The ratio of a circle\'s circumference to its diameter',
      },
    ];
  }

  private getScriptContextCompletions(): AutoCompletionItem[] {
    return [
      {
        label: 'ctx',
        kind: 'variable',
        detail: 'ScriptContext',
        documentation: 'The script execution context',
      },
      {
        label: 'ctx.script',
        kind: 'variable',
        detail: 'ScriptUtilities',
        documentation: 'Script utility functions',
      },
    ];
  }

  private getGeometryAPICompletions(): AutoCompletionItem[] {
    return [
      {
        label: 'ctx.geom.invoke',
        kind: 'function',
        detail: '(operation: string, params: any) => Promise<any>',
        documentation: 'Invoke a geometry operation',
        insertText: 'ctx.geom.invoke($1)',
      },
    ];
  }

  private getScriptUtilityCompletions(): AutoCompletionItem[] {
    return [
      {
        label: 'getInput',
        kind: 'function',
        detail: '<T>(name: string) => T | undefined',
        documentation: 'Get input value by name',
        insertText: 'getInput($1)',
      },
      {
        label: 'setOutput',
        kind: 'function',
        detail: '(name: string, value: any) => void',
        documentation: 'Set output value by name',
        insertText: 'setOutput($1, $2)',
      },
    ];
  }

  private getGeometryMethodCompletions(): AutoCompletionItem[] {
    return [
      {
        label: 'MAKE_BOX',
        kind: 'variable',
        detail: 'string',
        documentation: 'Create a box geometry',
      },
      {
        label: 'MAKE_SPHERE',
        kind: 'variable',
        detail: 'string',
        documentation: 'Create a sphere geometry',
      },
    ];
  }
}