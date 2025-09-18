
import { describe, it, expect } from 'vitest';
import { SerialNumberNode } from './serialnumber-node';
import { createTestContext } from '../test-utils';

describe('SerialNumberNode', () => {
  it('should create SerialNumber', async () => {
    const context = createTestContext();
    const inputs = {
      count: null
    };
    const params = {
      prefix: "SN",
      startNumber: 1,
      digits: 6,
      increment: 1
    };

    const result = await SerialNumberNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.serials).toBeDefined();
  });

  
});