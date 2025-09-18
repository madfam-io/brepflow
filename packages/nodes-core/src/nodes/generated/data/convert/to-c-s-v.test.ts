
import { describe, it, expect } from 'vitest';
import { ToCSVNode } from './tocsv-node';
import { createTestContext } from '../test-utils';

describe('ToCSVNode', () => {
  it('should create ToCSV', async () => {
    const context = createTestContext();
    const inputs = {
      data: /* test value */
    };
    const params = {
      delimiter: ",",
      headers: true
    };

    const result = await ToCSVNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.csv).toBeDefined();
  });

  
});