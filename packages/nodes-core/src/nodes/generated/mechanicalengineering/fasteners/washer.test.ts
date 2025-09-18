
import { describe, it, expect } from 'vitest';
import { WasherNode } from './washer-node';
import { createTestContext } from '../test-utils';

describe('WasherNode', () => {
  it('should create Washer', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      innerDiameter: 6.4,
      outerDiameter: 12,
      thickness: 1.6,
      type: "flat"
    };

    const result = await WasherNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.washer).toBeDefined();
  });

  
});