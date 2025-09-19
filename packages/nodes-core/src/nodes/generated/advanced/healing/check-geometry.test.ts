
import { describe, it, expect } from 'vitest';
import { CheckGeometryNode } from './checkgeometry.node';
import { createTestContext } from './../../test-utils';

describe('CheckGeometryNode', () => {
  it('should create CheckGeometry', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      checkLevel: "standard"
    };

    const result = await CheckGeometryNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isValid).toBeDefined();
    expect(result.errors).toBeDefined();
  });

  
});