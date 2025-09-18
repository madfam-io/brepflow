
import { describe, it, expect } from 'vitest';
import { MeshForFEANode } from './meshforfea-node';
import { createTestContext } from '../test-utils';

describe('MeshForFEANode', () => {
  it('should create MeshForFEA', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      elementType: "auto",
      elementSize: 5,
      refinementZones: true,
      qualityTarget: 0.8
    };

    const result = await MeshForFEANode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.feaMesh).toBeDefined();
    expect(result.qualityReport).toBeDefined();
  });

  
});