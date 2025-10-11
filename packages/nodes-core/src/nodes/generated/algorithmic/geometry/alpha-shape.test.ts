
import { describe, it, expect } from 'vitest';
import { AlphaShapeNode } from './alpha-shape.node';
import { createTestContext } from '../test-utils';

describe('AlphaShapeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      alpha: 1,
      mode: "3D"
    } as any;

    const result = await AlphaShapeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
