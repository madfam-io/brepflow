
import { describe, it, expect } from 'vitest';
import { ComponentPatternNode } from './componentpattern-node';
import { createTestContext } from '../test-utils';

describe('ComponentPatternNode', () => {
  it('should create ComponentPattern', async () => {
    const context = createTestContext();
    const inputs = {
      component: /* test value */
    };
    const params = {
      patternType: "linear",
      count: 3,
      spacing: 100
    };

    const result = await ComponentPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});