
import { describe, it, expect } from 'vitest';
import { GenerativeDesignNode } from './generativedesign-node';
import { createTestContext } from '../test-utils';

describe('GenerativeDesignNode', () => {
  it('should create GenerativeDesign', async () => {
    const context = createTestContext();
    const inputs = {
      designSpace: null,
      requirements: null
    };
    const params = {
      objectives: ["weight","strength"],
      generations: 20,
      populationSize: 50
    };

    const result = await GenerativeDesignNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.designs).toBeDefined();
    expect(result.paretoFront).toBeDefined();
  });

  
});