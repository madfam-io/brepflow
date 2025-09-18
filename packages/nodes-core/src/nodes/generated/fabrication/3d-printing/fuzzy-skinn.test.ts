
import { describe, it, expect } from 'vitest';
import { FuzzySkinnNode } from './fuzzyskinn-node';
import { createTestContext } from '../test-utils';

describe('FuzzySkinnNode', () => {
  it('should create FuzzySkinn', async () => {
    const context = createTestContext();
    const inputs = {
      perimeters: null
    };
    const params = {
      thickness: 0.3,
      pointDistance: 0.75
    };

    const result = await FuzzySkinnNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fuzzyPerimeters).toBeDefined();
  });

  
});