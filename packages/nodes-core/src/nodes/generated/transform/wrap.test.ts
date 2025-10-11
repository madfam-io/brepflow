
import { describe, it, expect } from 'vitest';
import { WrapNode } from './wrap.node';
import { createTestContext } from '../test-utils';

describe('WrapNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      type: "cylinder",
      radius: 50,
      angle: 360
    } as any;

    const result = await WrapNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
