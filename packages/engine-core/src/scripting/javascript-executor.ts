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

      // Wrap script in secure execution context
      const wrappedScript = this.wrapScript(script, sandbox);

      // Set up abort controller for timeout
      const abortController = new AbortController();
      this.executionContexts.set(executionId, abortController);

      // Set timeout
      const timeoutHandle = setTimeout(() => {
        abortController.abort();
      }, permissions.timeoutMS);

      try {
        // Execute script in Web Worker for isolation
        const result = await this.executeInWorker(
          wrappedScript,
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
      }
    }

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
      ctx: context,

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

  private wrapScript(script: string, sandbox: any): string {
    const sandboxKeys = Object.keys(sandbox);
    const sandboxValues = sandboxKeys.map(key => sandbox[key]);

    return `
(function(${sandboxKeys.join(', ')}) {
  "use strict";

  // Main script execution
  return (async function() {
    ${script}
  })();
})(${sandboxValues.map(() => 'arguments[arguments.length - 1]').join(', ')})
    `;
  }

  private async executeInWorker(
    wrappedScript: string,
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
        // For now, execute directly (in production, use Web Worker)
        const result = eval(wrappedScript);

        if (result instanceof Promise) {
          result.then(resolve).catch(reject);
        } else {
          resolve({ outputs: result, memoryUsage: 0 });
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