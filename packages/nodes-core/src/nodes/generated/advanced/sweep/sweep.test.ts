
import { describe, it, expect } from 'vitest';
import { SweepNode } from './sweep.node';
import { createTestContext } from '../test-utils';

describe('SweepNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      profile: undefined,
      path: undefined
    } as any;
    const params = {
      twistAngle: 0,
      scaleFactor: 1,
      keepOrientation: false,
      solid: true
    } as any;

    const result = await SweepNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
