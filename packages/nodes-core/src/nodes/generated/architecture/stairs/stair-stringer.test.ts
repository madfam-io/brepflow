
import { describe, it, expect } from 'vitest';
import { StairStringerNode } from './stairstringer-node';
import { createTestContext } from '../test-utils';

describe('StairStringerNode', () => {
  it('should create StairStringer', async () => {
    const context = createTestContext();
    const inputs = {
      stairProfile: null
    };
    const params = {
      type: "closed",
      material: "steel",
      depth: 300
    };

    const result = await StairStringerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.stringers).toBeDefined();
  });

  
});