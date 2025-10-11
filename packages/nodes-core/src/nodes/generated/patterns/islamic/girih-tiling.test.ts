
import { describe, it, expect } from 'vitest';
import { GirihTilingNode } from './girih-tiling.node';
import { createTestContext } from '../test-utils';

describe('GirihTilingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      type: "pentagon",
      size: 10
    } as any;

    const result = await GirihTilingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
