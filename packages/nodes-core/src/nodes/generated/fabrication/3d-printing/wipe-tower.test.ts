
import { describe, it, expect } from 'vitest';
import { WipeTowerNode } from './wipetower.node';
import { createTestContext } from './../../test-utils';

describe('WipeTowerNode', () => {
  it('should create WipeTower', async () => {
    const context = createTestContext();
    const inputs = {
      printHeight: null
    };
    const params = {
      towerWidth: 60,
      wipeVolume: 15
    };

    const result = await WipeTowerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tower).toBeDefined();
  });

  
});