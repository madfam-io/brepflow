/**
 * Script Engine Integration Tests
 * Tests for JavaScript execution and node generation
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ScriptEngine } from '../script-engine';
import { JavaScriptExecutor } from '../javascript-executor';
import type {
  ScriptContext,
  ScriptPermissions,
  ScriptedNodeDefinition,
  ScriptMetadata,
} from '../types';

describe('ScriptEngine', () => {
  let engine: ScriptEngine;
  let mockExecutor: JavaScriptExecutor;

  beforeEach(() => {
    mockExecutor = new JavaScriptExecutor();
    engine = new ScriptEngine({
      executors: new Map([['javascript', mockExecutor]]),
      maxScriptSize: 100000,
      executionTimeout: 5000,
      sandboxMemoryLimit: 50 * 1024 * 1024,
      allowedPackages: ['lodash', 'three'],
      templateStorage: new Map(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Script Compilation', () => {
    it('should compile a simple scripted node', async () => {
      const script = `
        function evaluate(ctx, inputs, params) {
          return {
            result: inputs.a + inputs.b + params.offset
          };
        }

        return {
          type: "Custom::Add",
          name: "Custom Add",
          description: "Adds two numbers with an offset",
          inputs: {
            a: { type: "number", description: "First number" },
            b: { type: "number", description: "Second number" }
          },
          outputs: {
            result: { type: "number", description: "Sum with offset" }
          },
          params: {
            offset: { type: "number", default: 0, description: "Offset value" }
          },
          evaluate
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: true,
        maxExecutionTime: 5000,
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: ['lodash'],
      };

      const result = await engine.compileScript(script, 'javascript', context, permissions);

      expect(result.success).toBe(true);
      expect(result.nodeDefinition).toBeDefined();
      expect(result.nodeDefinition?.type).toBe('Custom::Add');
      expect(result.nodeDefinition?.name).toBe('Custom Add');
      expect(result.nodeDefinition?.inputs.a).toBeDefined();
      expect(result.nodeDefinition?.outputs.result).toBeDefined();
      expect(result.nodeDefinition?.params.offset).toBeDefined();
    });

    it('should handle script compilation errors', async () => {
      const invalidScript = `
        // Invalid syntax
        function evaluate( {
          return undefined;
        }
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 5000,
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: [],
      };

      const result = await engine.compileScript(invalidScript, 'javascript', context, permissions);

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('syntax');
    });

    it('should validate node definition structure', async () => {
      const scriptWithInvalidDefinition = `
        return {
          // Missing required fields
          name: "Invalid Node"
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 5000,
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: [],
      };

      const result = await engine.compileScript(scriptWithInvalidDefinition, 'javascript', context, permissions);

      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.message.includes('type'))).toBe(true);
    });
  });

  describe('Script Execution', () => {
    it('should execute a compiled script', async () => {
      const script = `
        function evaluate(ctx, inputs, params) {
          return {
            sum: inputs.a + inputs.b + params.offset
          };
        }

        return {
          type: "Custom::Add",
          name: "Custom Add",
          description: "Adds two numbers",
          inputs: {
            a: { type: "number" },
            b: { type: "number" }
          },
          outputs: {
            sum: { type: "number" }
          },
          params: {
            offset: { type: "number", default: 0 }
          },
          evaluate
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 5000,
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: [],
      };

      const compilationResult = await engine.compileScript(script, 'javascript', context, permissions);
      expect(compilationResult.success).toBe(true);

      const nodeDefinition = compilationResult.nodeDefinition!;
      const executionResult = await engine.executeNode(
        nodeDefinition,
        { a: 5, b: 3 },
        { offset: 2 },
        context,
        permissions
      );

      expect(executionResult.success).toBe(true);
      expect(executionResult.outputs.sum).toBe(10); // 5 + 3 + 2
    });

    it('should handle execution errors gracefully', async () => {
      const script = `
        function evaluate(ctx, inputs, params) {
          throw new Error("Intentional error");
        }

        return {
          type: "Custom::Error",
          name: "Error Node",
          description: "Always throws an error",
          inputs: {},
          outputs: {},
          params: {},
          evaluate
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 5000,
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: [],
      };

      const compilationResult = await engine.compileScript(script, 'javascript', context, permissions);
      expect(compilationResult.success).toBe(true);

      const nodeDefinition = compilationResult.nodeDefinition!;
      const executionResult = await engine.executeNode(
        nodeDefinition,
        {},
        {},
        context,
        permissions
      );

      expect(executionResult.success).toBe(false);
      expect(executionResult.error).toBe('Intentional error');
    });

    it('should enforce execution timeout', async () => {
      const script = `
        function evaluate(ctx, inputs, params) {
          // Infinite loop
          while (true) {
            // This should be interrupted by timeout
          }
        }

        return {
          type: "Custom::InfiniteLoop",
          name: "Infinite Loop",
          description: "Never returns",
          inputs: {},
          outputs: {},
          params: {},
          evaluate
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 100, // Very short timeout
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: [],
      };

      const compilationResult = await engine.compileScript(script, 'javascript', context, permissions);
      expect(compilationResult.success).toBe(true);

      const nodeDefinition = compilationResult.nodeDefinition!;
      const executionResult = await engine.executeNode(
        nodeDefinition,
        {},
        {},
        context,
        permissions
      );

      expect(executionResult.success).toBe(false);
      expect(executionResult.error).toContain('timeout');
    });
  });

  describe('Template Management', () => {
    it('should save and load script templates', async () => {
      const template = {
        id: 'math-add-template',
        name: 'Math Add Template',
        description: 'Template for creating math addition nodes',
        category: 'Math',
        language: 'javascript' as const,
        script: `
          function evaluate(ctx, inputs, params) {
            return { result: inputs.a + inputs.b };
          }
          return {
            type: "Custom::Add",
            name: "Add",
            inputs: { a: { type: "number" }, b: { type: "number" } },
            outputs: { result: { type: "number" } },
            params: {},
            evaluate
          };
        `,
        metadata: {
          author: 'Test User',
          version: '1.0.0',
          tags: ['math', 'basic'],
          dependencies: [],
        },
      };

      await engine.saveTemplate(template);

      const retrievedTemplate = await engine.getTemplate(template.id);
      expect(retrievedTemplate).toEqual(template);

      const allTemplates = await engine.getTemplates();
      expect(allTemplates).toContainEqual(template);
    });

    it('should filter templates by category', async () => {
      const mathTemplate = {
        id: 'math-template',
        name: 'Math Template',
        description: 'Math operations',
        category: 'Math',
        language: 'javascript' as const,
        script: 'return {};',
        metadata: { author: 'Test', version: '1.0.0', tags: [], dependencies: [] },
      };

      const geometryTemplate = {
        id: 'geometry-template',
        name: 'Geometry Template',
        description: 'Geometry operations',
        category: 'Geometry',
        language: 'javascript' as const,
        script: 'return {};',
        metadata: { author: 'Test', version: '1.0.0', tags: [], dependencies: [] },
      };

      await engine.saveTemplate(mathTemplate);
      await engine.saveTemplate(geometryTemplate);

      const mathTemplates = await engine.getTemplates('Math');
      expect(mathTemplates).toHaveLength(1);
      expect(mathTemplates[0]).toEqual(mathTemplate);

      const geometryTemplates = await engine.getTemplates('Geometry');
      expect(geometryTemplates).toHaveLength(1);
      expect(geometryTemplates[0]).toEqual(geometryTemplate);
    });

    it('should delete templates', async () => {
      const template = {
        id: 'delete-me',
        name: 'Temporary Template',
        description: 'Will be deleted',
        category: 'Test',
        language: 'javascript' as const,
        script: 'return {};',
        metadata: { author: 'Test', version: '1.0.0', tags: [], dependencies: [] },
      };

      await engine.saveTemplate(template);
      expect(await engine.getTemplate(template.id)).toEqual(template);

      await engine.deleteTemplate(template.id);
      expect(await engine.getTemplate(template.id)).toBeNull();
    });
  });

  describe('Sandbox Management', () => {
    it('should create isolated sandboxes for different scripts', async () => {
      // This test would verify that sandboxes don't share state
      const script1 = `
        globalThis.testValue = 42;
        return {
          type: "Test::One",
          name: "Test One",
          inputs: {},
          outputs: {},
          params: {},
          evaluate: () => ({ value: globalThis.testValue })
        };
      `;

      const script2 = `
        return {
          type: "Test::Two",
          name: "Test Two",
          inputs: {},
          outputs: {},
          params: {},
          evaluate: () => ({ value: globalThis.testValue || 'undefined' })
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 5000,
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: [],
      };

      // Compile both scripts
      const result1 = await engine.compileScript(script1, 'javascript', context, permissions);
      const result2 = await engine.compileScript(script2, 'javascript', context, permissions);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);

      // Execute script 2 - should not see the global from script 1
      const execution2 = await engine.executeNode(
        result2.nodeDefinition!,
        {},
        {},
        context,
        permissions
      );

      expect(execution2.success).toBe(true);
      expect(execution2.outputs.value).toBe('undefined');
    });

    it('should enforce memory limits', async () => {
      const script = `
        function evaluate(ctx, inputs, params) {
          // Try to allocate a lot of memory
          const largeArray = new Array(10000000).fill('x'.repeat(1000));
          return { result: largeArray.length };
        }

        return {
          type: "Custom::MemoryHog",
          name: "Memory Hog",
          inputs: {},
          outputs: { result: { type: "number" } },
          params: {},
          evaluate
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 5000,
        maxMemoryUsage: 1024 * 1024, // 1MB limit
        allowedPackages: [],
      };

      const compilationResult = await engine.compileScript(script, 'javascript', context, permissions);
      expect(compilationResult.success).toBe(true);

      const executionResult = await engine.executeNode(
        compilationResult.nodeDefinition!,
        {},
        {},
        context,
        permissions
      );

      expect(executionResult.success).toBe(false);
      expect(executionResult.error).toContain('memory');
    });
  });

  describe('Integration with Node System', () => {
    it('should generate node definitions compatible with the node engine', async () => {
      const script = `
        function evaluate(ctx, inputs, params) {
          return {
            result: Math.pow(inputs.base, params.exponent)
          };
        }

        return {
          type: "Math::Power",
          name: "Power",
          description: "Raises a number to a power",
          category: "Math",
          inputs: {
            base: {
              type: "number",
              description: "Base number",
              required: true
            }
          },
          outputs: {
            result: {
              type: "number",
              description: "Result of base^exponent"
            }
          },
          params: {
            exponent: {
              type: "number",
              default: 2,
              description: "Exponent value",
              min: 0,
              max: 10
            }
          },
          evaluate
        };
      `;

      const context: ScriptContext = {
        nodeId: 'test-node',
        projectId: 'test-project',
        userId: 'test-user',
        environment: 'development',
        version: '1.0.0',
      };

      const permissions: ScriptPermissions = {
        allowNetworkAccess: false,
        allowFileSystemAccess: false,
        allowExternalLibraries: false,
        maxExecutionTime: 5000,
        maxMemoryUsage: 10 * 1024 * 1024,
        allowedPackages: [],
      };

      const result = await engine.compileScript(script, 'javascript', context, permissions);

      expect(result.success).toBe(true);

      const definition = result.nodeDefinition!;
      expect(definition.type).toBe('Math::Power');
      expect(definition.name).toBe('Power');
      expect(definition.category).toBe('Math');
      expect(definition.inputs.base.required).toBe(true);
      expect(definition.params.exponent.default).toBe(2);
      expect(definition.params.exponent.min).toBe(0);
      expect(definition.params.exponent.max).toBe(10);

      // Test execution
      const executionResult = await engine.executeNode(
        definition,
        { base: 3 },
        { exponent: 3 },
        context,
        permissions
      );

      expect(executionResult.success).toBe(true);
      expect(executionResult.outputs.result).toBe(27); // 3^3
    });
  });
});