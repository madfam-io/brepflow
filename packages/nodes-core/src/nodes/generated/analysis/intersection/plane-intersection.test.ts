
import { describe, it, expect } from 'vitest';
import { PlaneIntersectionNode } from './planeintersection-node';
import { createTestContext } from '../test-utils';

describe('PlaneIntersectionNode', () => {
  it('should create PlaneIntersection', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null,
      plane: null
    };
    const params = {
      tolerance: 0.01
    };

    const result = await PlaneIntersectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.intersectionCurves).toBeDefined();
    expect(result.sectionProfiles).toBeDefined();
  });

  
});