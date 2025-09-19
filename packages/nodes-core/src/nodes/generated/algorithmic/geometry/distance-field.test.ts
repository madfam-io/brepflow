
import { describe, it, expect } from 'vitest';
import { DistanceFieldNode } from './distancefield.node';
import { createTestContext } from './../../test-utils';

describe('DistanceFieldNode', () => {
  it('should create DistanceField', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null
    };
    const params = {
      resolution: 50,
      bounds: "100,100,100",
      signed: true
    };

    const result = await DistanceFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
    expect(result.isosurface).toBeDefined();
    expect(result.gradient).toBeDefined();
  });

  
});