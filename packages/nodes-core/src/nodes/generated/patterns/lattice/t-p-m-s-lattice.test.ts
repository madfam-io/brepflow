
import { describe, it, expect } from 'vitest';
import { TPMSLatticeNode } from './tpmslattice-node';
import { createTestContext } from '../test-utils';

describe('TPMSLatticeNode', () => {
  it('should create TPMSLattice', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: null
    };
    const params = {
      type: "gyroid",
      period: 10,
      thickness: 1
    };

    const result = await TPMSLatticeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.lattice).toBeDefined();
  });

  
});