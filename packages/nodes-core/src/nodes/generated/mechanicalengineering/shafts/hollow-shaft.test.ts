
import { describe, it, expect } from 'vitest';
import { HollowShaftNode } from './hollowshaft-node';
import { createTestContext } from '../test-utils';

describe('HollowShaftNode', () => {
  it('should create HollowShaft', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      outerDiameter: 40,
      innerDiameter: 30,
      length: 100,
      endMachining: "none"
    };

    const result = await HollowShaftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shaft).toBeDefined();
    expect(result.bore).toBeDefined();
  });

  
});