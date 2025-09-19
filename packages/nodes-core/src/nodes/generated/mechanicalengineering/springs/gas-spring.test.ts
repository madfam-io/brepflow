
import { describe, it, expect } from 'vitest';
import { GasSpringNode } from './gasspring.node';
import { createTestContext } from './../../test-utils';

describe('GasSpringNode', () => {
  it('should create GasSpring', async () => {
    const context = createTestContext();
    const inputs = {
      mountPoint: null
    };
    const params = {
      cylinderDiameter: 20,
      strokeLength: 100,
      extendedLength: 250,
      rodDiameter: 8
    };

    const result = await GasSpringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gasSpring).toBeDefined();
    expect(result.cylinder).toBeDefined();
    expect(result.rod).toBeDefined();
  });

  
});