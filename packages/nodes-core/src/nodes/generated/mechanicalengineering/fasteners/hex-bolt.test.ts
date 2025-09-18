
import { describe, it, expect } from 'vitest';
import { HexBoltNode } from './hexbolt-node';
import { createTestContext } from '../test-utils';

describe('HexBoltNode', () => {
  it('should create HexBolt', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      diameter: "M6",
      length: 20,
      threadPitch: 1,
      headHeight: 4
    };

    const result = await HexBoltNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bolt).toBeDefined();
    expect(result.thread).toBeDefined();
  });

  
});