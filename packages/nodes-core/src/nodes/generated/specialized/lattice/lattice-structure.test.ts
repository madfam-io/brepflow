
import { describe, it, expect } from 'vitest';
import { LatticeStructureNode } from './latticestructure.node';
import { createTestContext } from './../../test-utils';

describe('LatticeStructureNode', () => {
  it('should create LatticeStructure', async () => {
    const context = createTestContext();
    const inputs = {
      boundingShape: null
    };
    const params = {
      cellType: "cubic",
      cellSize: 10,
      strutDiameter: 1,
      porosity: 0.7
    };

    const result = await LatticeStructureNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.lattice).toBeDefined();
  });

  
});