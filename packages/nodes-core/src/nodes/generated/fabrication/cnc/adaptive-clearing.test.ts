
import { describe, it, expect } from 'vitest';
import { AdaptiveClearingNode } from './adaptive-clearing.node';
import { createTestContext } from '../test-utils';

describe('AdaptiveClearingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      region: undefined,
      depth: undefined
    } as any;
    const params = {
      optimalLoad: 0.4,
      helixAngle: 3
    } as any;

    const result = await AdaptiveClearingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
