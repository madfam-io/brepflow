
import { describe, it, expect } from 'vitest';
import { StringFormatNode } from './stringformat-node';
import { createTestContext } from '../test-utils';

describe('StringFormatNode', () => {
  it('should create StringFormat', async () => {
    const context = createTestContext();
    const inputs = {
      template: /* test value */,
      values: /* test value */
    };
    const params = {
      
    };

    const result = await StringFormatNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.formatted).toBeDefined();
  });

  
});