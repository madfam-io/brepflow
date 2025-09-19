
import { describe, it, expect } from 'vitest';
import { PlaneToPlaneNode } from './planetoplane.node';
import { createTestContext } from './../../test-utils';

describe('PlaneToPlaneNode', () => {
  it('should create PlaneToPlane', async () => {
    const context = createTestContext();
    const inputs = {
      plane1: null,
      plane2: null
    };
    const params = {
      distance: 0,
      parallel: true
    };

    const result = await PlaneToPlaneNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mated).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});