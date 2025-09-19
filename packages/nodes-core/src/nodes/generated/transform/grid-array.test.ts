
import { describe, it, expect } from 'vitest';
import { GridArrayNode } from './gridarray.node';
import { createTestContext } from './../test-utils';

describe('GridArrayNode', () => {
  it('should create GridArray', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      countX: 3,
      countY: 3,
      countZ: 1,
      spacingX: 100,
      spacingY: 100,
      spacingZ: 100,
      merge: false
    };

    const result = await GridArrayNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.array).toBeDefined();
    expect(result.merged).toBeDefined();
  });

  
});