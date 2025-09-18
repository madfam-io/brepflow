
import { describe, it, expect } from 'vitest';
import { SuspendedCeilingNode } from './suspendedceiling-node';
import { createTestContext } from '../test-utils';

describe('SuspendedCeilingNode', () => {
  it('should create SuspendedCeiling', async () => {
    const context = createTestContext();
    const inputs = {
      roomBoundary: null
    };
    const params = {
      tileSize: "600x600",
      suspensionHeight: 300
    };

    const result = await SuspendedCeilingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.ceiling).toBeDefined();
    expect(result.grid).toBeDefined();
    expect(result.tiles).toBeDefined();
  });

  
});