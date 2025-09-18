
import { describe, it, expect } from 'vitest';
import { CVTDiscNode } from './cvtdisc-node';
import { createTestContext } from '../test-utils';

describe('CVTDiscNode', () => {
  it('should create CVTDisc', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      minDiameter: 30,
      maxDiameter: 100,
      coneAngle: 11,
      shaftDiameter: 20
    };

    const result = await CVTDiscNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.disc).toBeDefined();
    expect(result.contactSurface).toBeDefined();
  });

  
});