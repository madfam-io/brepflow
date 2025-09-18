
import { describe, it, expect } from 'vitest';
import { VariableShellNode } from './variableshell-node';
import { createTestContext } from '../test-utils';

describe('VariableShellNode', () => {
  it('should create VariableShell', async () => {
    const context = createTestContext();
    const inputs = {
      solid: /* test value */,
      facesToRemove: /* test value */,
      thicknessMap: /* test value */
    };
    const params = {
      
    };

    const result = await VariableShellNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shell).toBeDefined();
  });

  
});