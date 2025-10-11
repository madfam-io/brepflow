
import { describe, it, expect } from 'vitest';
import { SetPowerSetNode } from './set-power-set.node';
import { createTestContext } from '../test-utils';

describe('SetPowerSetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      set: undefined
    } as any;
    const params = {

    } as any;

    const result = await SetPowerSetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
