
import { describe, it, expect } from 'vitest';
import { PointToPointNode } from './pointtopoint-node';
import { createTestContext } from '../test-utils';

describe('PointToPointNode', () => {
  it('should create PointToPoint', async () => {
    const context = createTestContext();
    const inputs = {
      point1: /* test value */,
      point2: /* test value */
    };
    const params = {
      
    };

    const result = await PointToPointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mated).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});