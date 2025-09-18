
import { describe, it, expect } from 'vitest';
import { DistancePointToPlaneNode } from './distancepointtoplane-node';
import { createTestContext } from '../test-utils';

describe('DistancePointToPlaneNode', () => {
  it('should create DistancePointToPlane', async () => {
    const context = createTestContext();
    const inputs = {
      point: null,
      plane: null
    };
    const params = {
      
    };

    const result = await DistancePointToPlaneNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.distance).toBeDefined();
    expect(result.projectedPoint).toBeDefined();
  });

  
});