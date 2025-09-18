
import { describe, it, expect } from 'vitest';
import { PeanoCurveNode } from './peanocurve-node';
import { createTestContext } from '../test-utils';

describe('PeanoCurveNode', () => {
  it('should create PeanoCurve', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: null
    };
    const params = {
      order: 3
    };

    const result = await PeanoCurveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});