
import { describe, it, expect } from 'vitest';
import { CurveAttractorNode } from './curve-attractor.node';
import { createTestContext } from '../test-utils';

describe('CurveAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curves: undefined
    } as any;
    const params = {
      strength: 1,
      radius: 50,
      falloff: "smooth"
    } as any;

    const result = await CurveAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
