
import { describe, it, expect } from 'vitest';
import { ToCSVNode } from './to-csv.node';
import { createTestContext } from '../test-utils';

describe('ToCSVNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {
      delimiter: ",",
      headers: true
    } as any;

    const result = await ToCSVNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
