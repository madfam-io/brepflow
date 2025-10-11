
import { describe, it, expect } from 'vitest';
import { ComponentPatternNode } from './component-pattern.node';
import { createTestContext } from '../test-utils';

describe('ComponentPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      component: undefined
    } as any;
    const params = {
      patternType: "linear",
      count: 3,
      spacing: 100
    } as any;

    const result = await ComponentPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
