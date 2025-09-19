
import { describe, it, expect } from 'vitest';
import { IslamicGridNode } from './islamicgrid.node';
import { createTestContext } from './../../test-utils';

describe('IslamicGridNode', () => {
  it('should create IslamicGrid', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      gridType: "octagonal",
      spacing: 10
    };

    const result = await IslamicGridNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.grid).toBeDefined();
  });

  
});