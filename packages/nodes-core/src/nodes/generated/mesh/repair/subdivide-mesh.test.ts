
import { describe, it, expect } from 'vitest';
import { SubdivideMeshNode } from './subdividemesh-node';
import { createTestContext } from '../test-utils';

describe('SubdivideMeshNode', () => {
  it('should create SubdivideMesh', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      subdivisionType: "loop",
      levels: 1
    };

    const result = await SubdivideMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.subdivided).toBeDefined();
  });

  
});