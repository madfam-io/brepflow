
import { describe, it, expect } from 'vitest';
import { IslamicGridNode } from './islamic-grid.node';
import { createTestContext } from '../test-utils';

describe('IslamicGridNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      gridType: "octagonal",
      spacing: 10
    } as any;

    const result = await IslamicGridNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
