
import { describe, it, expect } from 'vitest';
import { VoronoiOffsetNode } from './voronoioffset-node';
import { createTestContext } from '../test-utils';

describe('VoronoiOffsetNode', () => {
  it('should create VoronoiOffset', async () => {
    const context = createTestContext();
    const inputs = {
      cells: /* test value */
    };
    const params = {
      offset: 1,
      roundCorners: false
    };

    const result = await VoronoiOffsetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.offsetCells).toBeDefined();
  });

  
});