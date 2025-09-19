
import { describe, it, expect } from 'vitest';
import { ApplyLoadsNode } from './applyloads.node';
import { createTestContext } from './../../test-utils';

describe('ApplyLoadsNode', () => {
  it('should create ApplyLoads', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null,
      applicationFaces: null
    };
    const params = {
      loadType: "force",
      magnitude: 1000,
      direction: [0,0,-1],
      units: "N"
    };

    const result = await ApplyLoadsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.loadedMesh).toBeDefined();
    expect(result.loadData).toBeDefined();
  });

  
});