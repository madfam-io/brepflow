
import { describe, it, expect } from 'vitest';
import { RectangularPatternNode } from './rectangular-pattern.node';
import { createTestContext } from '../test-utils';

describe('RectangularPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      countX: 4,
      countY: 3,
      spacingX: 20,
      spacingY: 20,
      staggered: false
    } as any;

    const result = await RectangularPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
