
import { describe, it, expect } from 'vitest';
import { WipeTowerNode } from './wipe-tower.node';
import { createTestContext } from '../test-utils';

describe('WipeTowerNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      printHeight: undefined
    } as any;
    const params = {
      towerWidth: 60,
      wipeVolume: 15
    } as any;

    const result = await WipeTowerNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
