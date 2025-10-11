
import { describe, it, expect } from 'vitest';
import { CounterboreHoleNode } from './counterbore-hole.node';
import { createTestContext } from '../test-utils';

describe('CounterboreHoleNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      solid: undefined,
      position: undefined
    } as any;
    const params = {
      holeDiameter: 6.5,
      counterbore: 11,
      cbDepth: 6,
      holeDepth: -1
    } as any;

    const result = await CounterboreHoleNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
