
import { describe, it, expect } from 'vitest';
import { DistancePointToLineNode } from './distancepointtoline-node';
import { createTestContext } from '../test-utils';

describe('DistancePointToLineNode', () => {
  it('should create DistancePointToLine', async () => {
    const context = createTestContext();
    const inputs = {
      point: null,
      line: null
    };
    const params = {
      
    };

    const result = await DistancePointToLineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.distance).toBeDefined();
    expect(result.closestPoint).toBeDefined();
  });

  
});