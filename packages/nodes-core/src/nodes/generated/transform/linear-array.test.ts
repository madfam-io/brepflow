
import { describe, it, expect } from 'vitest';
import { LinearArrayNode } from './lineararray-node';
import { createTestContext } from '../test-utils';

describe('LinearArrayNode', () => {
  it('should create LinearArray', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      count: 5,
      spacingX: 100,
      spacingY: 0,
      spacingZ: 0,
      merge: false
    };

    const result = await LinearArrayNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.array).toBeDefined();
    expect(result.merged).toBeDefined();
  });

  
});