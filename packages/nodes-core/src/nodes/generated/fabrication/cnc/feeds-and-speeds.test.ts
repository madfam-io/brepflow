
import { describe, it, expect } from 'vitest';
import { FeedsAndSpeedsNode } from './feedsandspeeds-node';
import { createTestContext } from '../test-utils';

describe('FeedsAndSpeedsNode', () => {
  it('should create FeedsAndSpeeds', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      material: "aluminum",
      toolMaterial: "carbide",
      toolDiameter: 6
    };

    const result = await FeedsAndSpeedsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spindleSpeed).toBeDefined();
    expect(result.feedRate).toBeDefined();
    expect(result.chipLoad).toBeDefined();
  });

  
});