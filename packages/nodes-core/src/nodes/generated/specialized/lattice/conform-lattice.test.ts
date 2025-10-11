
import { describe, it, expect } from 'vitest';
import { ConformLatticeNode } from './conform-lattice.node';
import { createTestContext } from '../test-utils';

describe('ConformLatticeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      targetShape: undefined,
      latticePattern: undefined
    } as any;
    const params = {
      conformType: "volume",
      cellSize: 10
    } as any;

    const result = await ConformLatticeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
