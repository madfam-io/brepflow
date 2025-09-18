
import { describe, it, expect } from 'vitest';
import { MeshBooleanNode } from './meshboolean-node';
import { createTestContext } from '../test-utils';

describe('MeshBooleanNode', () => {
  it('should create MeshBoolean', async () => {
    const context = createTestContext();
    const inputs = {
      mesh1: null,
      mesh2: null
    };
    const params = {
      operation: "union",
      tolerance: 0.01
    };

    const result = await MeshBooleanNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});