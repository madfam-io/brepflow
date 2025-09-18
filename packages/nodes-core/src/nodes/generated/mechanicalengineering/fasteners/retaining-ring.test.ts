
import { describe, it, expect } from 'vitest';
import { RetainingRingNode } from './retainingring-node';
import { createTestContext } from '../test-utils';

describe('RetainingRingNode', () => {
  it('should create RetainingRing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      shaftDiameter: 10,
      type: "external",
      thickness: 1,
      grooveWidth: 1.2
    };

    const result = await RetainingRingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.ring).toBeDefined();
    expect(result.groove).toBeDefined();
  });

  
});