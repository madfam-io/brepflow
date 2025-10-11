
import { describe, it, expect } from 'vitest';
import { CoastingSetupNode } from './coasting-setup.node';
import { createTestContext } from '../test-utils';

describe('CoastingSetupNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      extrusions: undefined
    } as any;
    const params = {
      coastVolume: 0.064,
      minVolume: 0.8
    } as any;

    const result = await CoastingSetupNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
