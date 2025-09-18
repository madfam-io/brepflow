
import { describe, it, expect } from 'vitest';
import { RepairMeshNode } from './repairmesh-node';
import { createTestContext } from '../test-utils';

describe('RepairMeshNode', () => {
  it('should create RepairMesh', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      fillHoles: true,
      fixNormals: true,
      removeDegenerate: true,
      removeDuplicates: true,
      makeManifold: false
    };

    const result = await RepairMeshNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.repaired).toBeDefined();
    expect(result.report).toBeDefined();
  });

  
});