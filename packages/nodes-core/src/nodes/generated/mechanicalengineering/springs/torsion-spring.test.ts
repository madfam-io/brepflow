
import { describe, it, expect } from 'vitest';
import { TorsionSpringNode } from './torsionspring.node';
import { createTestContext } from './../../test-utils';

describe('TorsionSpringNode', () => {
  it('should create TorsionSpring', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      wireDiameter: 2,
      coilDiameter: 20,
      coils: 5,
      legLength: 30,
      legAngle: 90
    };

    const result = await TorsionSpringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spring).toBeDefined();
    expect(result.legs).toBeDefined();
  });

  
});