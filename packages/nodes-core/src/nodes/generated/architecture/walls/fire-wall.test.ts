
import { describe, it, expect } from 'vitest';
import { FireWallNode } from './firewall-node';
import { createTestContext } from '../test-utils';

describe('FireWallNode', () => {
  it('should create FireWall', async () => {
    const context = createTestContext();
    const inputs = {
      path: /* test value */
    };
    const params = {
      fireRating: "2-hour",
      thickness: 250
    };

    const result = await FireWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fireWall).toBeDefined();
  });

  
});