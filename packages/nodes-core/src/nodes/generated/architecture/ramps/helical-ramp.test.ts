
import { describe, it, expect } from 'vitest';
import { HelicalRampNode } from './helical-ramp.node';
import { createTestContext } from '../test-utils';

describe('HelicalRampNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      centerPoint: undefined,
      levels: undefined
    } as any;
    const params = {
      radius: 15000,
      pitch: 3000,
      width: 7000
    } as any;

    const result = await HelicalRampNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
