
import { describe, it, expect } from 'vitest';
import { FlexibleShaftNode } from './flexibleshaft-node';
import { createTestContext } from '../test-utils';

describe('FlexibleShaftNode', () => {
  it('should create FlexibleShaft', async () => {
    const context = createTestContext();
    const inputs = {
      path: null
    };
    const params = {
      coreDiameter: 5,
      outerDiameter: 8,
      length: 300,
      windingAngle: 45
    };

    const result = await FlexibleShaftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shaft).toBeDefined();
    expect(result.centerline).toBeDefined();
  });

  
});