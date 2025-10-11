
import { describe, it, expect } from 'vitest';
import { RectanglePackingNode } from './rectangle-packing.node';
import { createTestContext } from '../test-utils';

describe('RectanglePackingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      container: undefined,
      rectangles: undefined
    } as any;
    const params = {
      algorithm: "maxrects"
    } as any;

    const result = await RectanglePackingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
