
import { describe, it, expect } from 'vitest';
import { VariableShellNode } from './variable-shell.node';
import { createTestContext } from '../test-utils';

describe('VariableShellNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      solid: undefined,
      facesToRemove: undefined,
      thicknessMap: undefined
    } as any;
    const params = {

    } as any;

    const result = await VariableShellNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
