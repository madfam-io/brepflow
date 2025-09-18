
import { describe, it, expect } from 'vitest';
import { GeometryValidationNode } from './geometryvalidation-node';
import { createTestContext } from '../test-utils';

describe('GeometryValidationNode', () => {
  it('should create GeometryValidation', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null
    };
    const params = {
      tolerance: 0.01,
      checkClosed: true,
      checkValid: true
    };

    const result = await GeometryValidationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.isValid).toBeDefined();
    expect(result.isClosed).toBeDefined();
    expect(result.errors).toBeDefined();
    expect(result.problemAreas).toBeDefined();
  });

  
});