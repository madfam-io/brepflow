
import { describe, it, expect } from 'vitest';
import { FlangeBearingNode } from './flangebearing-node';
import { createTestContext } from '../test-utils';

describe('FlangeBearingNode', () => {
  it('should create FlangeBearing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      boreDiameter: 12,
      flangeDiameter: 40,
      thickness: 8,
      mountingHoles: 4
    };

    const result = await FlangeBearingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bearing).toBeDefined();
    expect(result.flange).toBeDefined();
    expect(result.holes).toBeDefined();
  });

  
});