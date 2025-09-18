
import { describe, it, expect } from 'vitest';
import { DoubleDoorNode } from './doubledoor-node';
import { createTestContext } from '../test-utils';

describe('DoubleDoorNode', () => {
  it('should create DoubleDoor', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      totalWidth: 1800,
      height: 2100,
      activeLeaf: "both"
    };

    const result = await DoubleDoorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.doors).toBeDefined();
    expect(result.frame).toBeDefined();
  });

  
});