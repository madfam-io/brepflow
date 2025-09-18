
import { describe, it, expect } from 'vitest';
import { OffsetSurfaceNode } from './offsetsurface-node';
import { createTestContext } from '../test-utils';

describe('OffsetSurfaceNode', () => {
  it('should create OffsetSurface', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */
    };
    const params = {
      offset: 5,
      fillGaps: true,
      extend: false
    };

    const result = await OffsetSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.offsetShape).toBeDefined();
  });

  
});