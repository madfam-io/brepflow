
import { describe, it, expect } from 'vitest';
import { RectanglePackingNode } from './rectanglepacking-node';
import { createTestContext } from '../test-utils';

describe('RectanglePackingNode', () => {
  it('should create RectanglePacking', async () => {
    const context = createTestContext();
    const inputs = {
      container: /* test value */,
      rectangles: /* test value */
    };
    const params = {
      algorithm: "maxrects"
    };

    const result = await RectanglePackingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.packed).toBeDefined();
    expect(result.transforms).toBeDefined();
  });

  
});