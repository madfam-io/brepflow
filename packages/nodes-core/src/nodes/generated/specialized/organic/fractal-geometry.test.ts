
import { describe, it, expect } from 'vitest';
import { FractalGeometryNode } from './fractal-geometry.node';
import { createTestContext } from '../test-utils';

describe('FractalGeometryNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      type: "koch",
      iterations: 3,
      scale: 100
    } as any;

    const result = await FractalGeometryNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
