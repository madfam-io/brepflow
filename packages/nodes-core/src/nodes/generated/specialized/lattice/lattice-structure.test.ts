
import { describe, it, expect } from 'vitest';
import { LatticeStructureNode } from './lattice-structure.node';
import { createTestContext } from '../test-utils';

describe('LatticeStructureNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundingShape: undefined
    } as any;
    const params = {
      cellType: "cubic",
      cellSize: 10,
      strutDiameter: 1,
      porosity: 0.7
    } as any;

    const result = await LatticeStructureNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
