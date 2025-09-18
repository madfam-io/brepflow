
import { describe, it, expect } from 'vitest';
import { RectangularPatternNode } from './rectangularpattern-node';
import { createTestContext } from '../test-utils';

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

    const result = await RectangularPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shapes).toBeDefined();
    expect(result.compound).toBeDefined();
  });

  
});