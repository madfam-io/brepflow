
import { describe, it, expect } from 'vitest';
import { MeshBooleanNode } from './mesh-boolean.node';
import { createTestContext } from '../test-utils';

describe('MeshBooleanNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh1: undefined,
      mesh2: undefined
    } as any;
    const params = {
      operation: "union",
      tolerance: 0.01
    } as any;

    const result = await MeshBooleanNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
