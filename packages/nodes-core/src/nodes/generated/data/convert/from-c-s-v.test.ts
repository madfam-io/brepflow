
import { describe, it, expect } from 'vitest';
import { FromCSVNode } from './fromcsv.node';
import { createTestContext } from './../../test-utils';

describe('FromCSVNode', () => {
  it('should create FromCSV', async () => {
    const context = createTestContext();
    const inputs = {
      csv: null
    };
    const params = {
      delimiter: ",",
      headers: true
    };

    const result = await FromCSVNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.headers).toBeDefined();
  });

  
});