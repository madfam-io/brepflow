
import { describe, it, expect } from 'vitest';
import { KelvinLatticeNode } from './kelvin-lattice.node';
import { createTestContext } from '../test-utils';

describe('KelvinLatticeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: undefined
    } as any;
    const params = {
      cellSize: 10,
      wallThickness: 0.5
    } as any;

    const result = await KelvinLatticeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
