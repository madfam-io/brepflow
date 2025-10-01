
import { describe, it, expect } from 'vitest';
import { RectangularPatternNode } from './rectangular-pattern.node';
import { createTestContext } from './../../test-utils';

describe('RectangularPatternNode', () => {
  it('should create RectangularPattern', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      countX: 4,
      countY: 3,
      spacingX: 20,
      spacingY: 20,
      staggered: false
    };

    await expect(RectangularPatternNode.evaluate(context, inputs, params))
      .rejects.toThrow('RectangularPattern not yet implemented');
  });

  
});
