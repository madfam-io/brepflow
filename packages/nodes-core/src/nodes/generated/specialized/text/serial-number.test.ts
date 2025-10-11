
import { describe, it, expect } from 'vitest';
import { SerialNumberNode } from './serial-number.node';
import { createTestContext } from '../test-utils';

describe('SerialNumberNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      count: undefined
    } as any;
    const params = {
      prefix: "SN",
      startNumber: 1,
      digits: 6,
      increment: 1
    } as any;

    const result = await SerialNumberNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
