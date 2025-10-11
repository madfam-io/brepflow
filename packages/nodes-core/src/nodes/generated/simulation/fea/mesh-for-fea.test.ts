
import { describe, it, expect } from 'vitest';
import { MeshForFEANode } from './mesh-for-fea.node';
import { createTestContext } from '../test-utils';

describe('MeshForFEANode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      elementType: "auto",
      elementSize: 5,
      refinementZones: true,
      qualityTarget: 0.8
    } as any;

    const result = await MeshForFEANode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
