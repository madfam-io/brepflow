
import { describe, it, expect } from 'vitest';
import { GenerativeDesignNode } from './generative-design.node';
import { createTestContext } from '../test-utils';

describe('GenerativeDesignNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      designSpace: undefined,
      requirements: undefined
    } as any;
    const params = {
      objectives: ["weight","strength"],
      generations: 20,
      populationSize: 50
    } as any;

    const result = await GenerativeDesignNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
