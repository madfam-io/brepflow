
import { describe, it, expect } from 'vitest';
import { KelvinLatticeNode } from './kelvinlattice-node';
import { createTestContext } from '../test-utils';

describe('KelvinLatticeNode', () => {
  it('should create KelvinLattice', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: /* test value */
    };
    const params = {
      cellSize: 10,
      wallThickness: 0.5
    };

    const result = await KelvinLatticeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.foam).toBeDefined();
  });

  
});