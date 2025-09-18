
import { describe, it, expect } from 'vitest';
import { DecimateMeshNode } from './decimatemesh-node';
import { createTestContext } from '../test-utils';

describe('DecimateMeshNode', () => {
  it('should create DecimateMesh', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */
    };
    const params = {
      targetTriangles: 1000,
      preserveFeatures: true,
      featureAngle: 30
    };

    const result = await DecimateMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.decimated).toBeDefined();
  });

  
});