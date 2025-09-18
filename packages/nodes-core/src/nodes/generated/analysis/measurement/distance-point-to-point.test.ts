
import { describe, it, expect } from 'vitest';
import { DistancePointToPointNode } from './distancepointtopoint-node';
import { createTestContext } from '../test-utils';

describe('DistancePointToPointNode', () => {
  it('should create DistancePointToPoint', async () => {
    const context = createTestContext();
    const inputs = {
      point1: /* test value */,
      point2: /* test value */
    };
    const params = {
      
    };

    const result = await DistancePointToPointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.distance).toBeDefined();
    expect(result.vector).toBeDefined();
  });

  
});