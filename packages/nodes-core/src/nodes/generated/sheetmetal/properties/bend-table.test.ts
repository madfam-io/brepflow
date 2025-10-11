
import { describe, it, expect } from 'vitest';
import { BendTableNode } from './bend-table.node';
import { createTestContext } from '../test-utils';

describe('BendTableNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tableData: undefined
    } as any;
    const params = {
      tableType: "k-factor"
    } as any;

    const result = await BendTableNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
