
import { describe, it, expect } from 'vitest';
import { MomentOfInertiaNode } from './momentofinertia-node';
import { createTestContext } from '../test-utils';

describe('MomentOfInertiaNode', () => {
  it('should create MomentOfInertia', async () => {
    const context = createTestContext();
    const inputs = {
      solid: null
    };
    const params = {
      
    };

    const result = await MomentOfInertiaNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.Ixx).toBeDefined();
    expect(result.Iyy).toBeDefined();
    expect(result.Izz).toBeDefined();
    expect(result.principalAxes).toBeDefined();
  });

  
});