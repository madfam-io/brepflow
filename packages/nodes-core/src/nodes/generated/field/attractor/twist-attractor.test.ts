
import { describe, it, expect } from 'vitest';
import { TwistAttractorNode } from './twist-attractor.node';
import { createTestContext } from '../test-utils';

describe('TwistAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      axis: undefined
    } as any;
    const params = {
      angle: 90,
      height: 100,
      radius: 50,
      falloff: "smooth"
    } as any;

    const result = await TwistAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
