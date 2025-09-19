
import { describe, it, expect } from 'vitest';
import { ComplexMagnitudeNode } from './complexmagnitude.node';
import { createTestContext } from './../../test-utils';

describe('ComplexMagnitudeNode', () => {
  it('should create ComplexMagnitude', async () => {
    const context = createTestContext();
    const inputs = {
      complex: null
    };
    const params = {
      
    };

    const result = await ComplexMagnitudeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.magnitude).toBeDefined();
  });

  
});