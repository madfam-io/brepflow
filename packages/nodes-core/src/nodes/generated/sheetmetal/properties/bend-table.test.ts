
import { describe, it, expect } from 'vitest';
import { BendTableNode } from './bendtable-node';
import { createTestContext } from '../test-utils';

describe('BendTableNode', () => {
  it('should create BendTable', async () => {
    const context = createTestContext();
    const inputs = {
      tableData: /* test value */
    };
    const params = {
      tableType: "k-factor"
    };

    const result = await BendTableNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bendTable).toBeDefined();
  });

  
});