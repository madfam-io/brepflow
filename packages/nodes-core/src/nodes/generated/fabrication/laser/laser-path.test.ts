
import { describe, it, expect } from 'vitest';
import { LaserPathNode } from './laserpath-node';
import { createTestContext } from '../test-utils';

describe('LaserPathNode', () => {
  it('should create LaserPath', async () => {
    const context = createTestContext();
    const inputs = {
      profiles: /* test value */
    };
    const params = {
      kerf: 0.15,
      cornerRadius: 0
    };

    const result = await LaserPathNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cuttingPath).toBeDefined();
  });

  
});