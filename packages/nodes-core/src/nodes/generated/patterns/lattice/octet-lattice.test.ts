
import { describe, it, expect } from 'vitest';
import { OctetLatticeNode } from './octetlattice.node';
import { createTestContext } from './../../test-utils';

describe('OctetLatticeNode', () => {
  it('should create OctetLattice', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: null
    };
    const params = {
      cellSize: 10,
      strutDiameter: 1
    };

    const result = await OctetLatticeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.lattice).toBeDefined();
  });

  
});