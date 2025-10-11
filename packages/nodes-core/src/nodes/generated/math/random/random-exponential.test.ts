
import { describe, it, expect } from 'vitest';
import { RandomExponentialNode } from './random-exponential.node';
import { createTestContext } from '../test-utils';

describe('RandomExponentialNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      lambda: 1,
      seed: -1
    } as any;

    const result = await RandomExponentialNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
