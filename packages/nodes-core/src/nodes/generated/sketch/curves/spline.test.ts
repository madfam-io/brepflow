
import { describe, it, expect } from 'vitest';
import { SplineNode } from './spline.node';
import { createTestContext } from './../../test-utils';

describe('SplineNode', () => {
  it('should create Spline', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      degree: 3,
      closed: false,
      smooth: true
    };

    const result = await SplineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});