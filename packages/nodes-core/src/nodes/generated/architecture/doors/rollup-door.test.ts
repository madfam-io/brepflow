
import { describe, it, expect } from 'vitest';
import { RollupDoorNode } from './rollupdoor-node';
import { createTestContext } from '../test-utils';

describe('RollupDoorNode', () => {
  it('should create RollupDoor', async () => {
    const context = createTestContext();
    const inputs = {
      opening: null
    };
    const params = {
      slatHeight: 75,
      openHeight: 0
    };

    const result = await RollupDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rollupDoor).toBeDefined();
    expect(result.guides).toBeDefined();
  });

  
});