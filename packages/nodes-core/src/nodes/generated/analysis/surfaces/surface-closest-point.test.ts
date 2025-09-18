
import { describe, it, expect } from 'vitest';
import { SurfaceClosestPointNode } from './surfaceclosestpoint-node';
import { createTestContext } from '../test-utils';

describe('SurfaceClosestPointNode', () => {
  it('should create SurfaceClosestPoint', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */,
      point: /* test value */
    };
    const params = {
      tolerance: 0.01,
      showConnection: true
    };

    const result = await SurfaceClosestPointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.closestPoint).toBeDefined();
    expect(result.distance).toBeDefined();
    expect(result.uParameter).toBeDefined();
    expect(result.vParameter).toBeDefined();
  });

  
});