
import { describe, it, expect } from 'vitest';
import { FromCSVNode } from './from-csv.node';
import { createTestContext } from '../test-utils';

describe('FromCSVNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      csv: undefined
    } as any;
    const params = {
      delimiter: ",",
      headers: true
    } as any;

    const result = await FromCSVNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
