
import { describe, it, expect } from 'vitest';
import { DecimateMeshNode } from './decimate-mesh.node';
import { createTestContext } from '../test-utils';

describe('DecimateMeshNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined
    } as any;
    const params = {
      targetTriangles: 1000,
      preserveFeatures: true,
      featureAngle: 30
    } as any;

    const result = await DecimateMeshNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
