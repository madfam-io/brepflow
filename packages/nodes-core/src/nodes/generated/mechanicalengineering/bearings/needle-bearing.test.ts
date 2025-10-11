
import { describe, it, expect } from 'vitest';
import { NeedleBearingNode } from './needle-bearing.node';
import { createTestContext } from '../test-utils';

describe('NeedleBearingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      innerDiameter: 15,
      outerDiameter: 21,
      width: 12,
      needleCount: 20
    } as any;

    const result = await NeedleBearingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
