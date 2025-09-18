
import { describe, it, expect } from 'vitest';
import { StringTrimNode } from './stringtrim-node';
import { createTestContext } from '../test-utils';

describe('StringTrimNode', () => {
  it('should create StringTrim', async () => {
    const context = createTestContext();
    const inputs = {
      string: /* test value */
    };
    const params = {
      mode: "both"
    };

    const result = await StringTrimNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trimmed).toBeDefined();
  });

  
});