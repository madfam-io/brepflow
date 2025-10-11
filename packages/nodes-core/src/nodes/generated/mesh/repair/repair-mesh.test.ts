
import { describe, it, expect } from 'vitest';
import { RepairMeshNode } from './repair-mesh.node';
import { createTestContext } from '../test-utils';

describe('RepairMeshNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined
    } as any;
    const params = {
      fillHoles: true,
      fixNormals: true,
      removeDegenerate: true,
      removeDuplicates: true,
      makeManifold: false
    } as any;

    const result = await RepairMeshNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
