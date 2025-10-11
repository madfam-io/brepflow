
import { describe, it, expect } from 'vitest';
import { WormGearNode } from './worm-gear.node';
import { createTestContext } from '../test-utils';

describe('WormGearNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      module: 2,
      teeth: 30,
      diameter: 60,
      width: 20
    } as any;

    const result = await WormGearNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
