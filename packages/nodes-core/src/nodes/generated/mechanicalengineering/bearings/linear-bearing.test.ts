
import { describe, it, expect } from 'vitest';
import { LinearBearingNode } from './linearbearing-node';
import { createTestContext } from '../test-utils';

describe('LinearBearingNode', () => {
  it('should create LinearBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      shaftDiameter: 8,
      outerDiameter: 15,
      length: 24,
      type: "ball"
    };

    const result = await LinearBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.bore).toBeDefined();
  });

  
});