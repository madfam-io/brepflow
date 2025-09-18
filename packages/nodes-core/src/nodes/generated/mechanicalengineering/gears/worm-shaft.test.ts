
import { describe, it, expect } from 'vitest';
import { WormShaftNode } from './wormshaft-node';
import { createTestContext } from '../test-utils';

describe('WormShaftNode', () => {
  it('should create WormShaft', async () => {
    const context = createTestContext();
    const inputs = {
      axis: /* test value */
    };
    const params = {
      module: 2,
      starts: 1,
      length: 50,
      leadAngle: 5
    };

    const result = await WormShaftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.worm).toBeDefined();
    expect(result.helix).toBeDefined();
  });

  
});