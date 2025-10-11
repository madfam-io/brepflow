
import { describe, it, expect } from 'vitest';
import { PointAttractorNode } from './point-attractor.node';
import { createTestContext } from '../test-utils';

describe('PointAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      strength: 1,
      radius: 100,
      falloff: "quadratic"
    } as any;

    const result = await PointAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
