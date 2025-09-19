
import { describe, it, expect } from 'vitest';
import { TrimNode } from './trim.node';
import { createTestContext } from './../../test-utils';

describe('TrimNode', () => {
  it('should create Trim', async () => {
    const context = createTestContext();
    const inputs = {
      curve: null
    };
    const params = {
      startParameter: 0,
      endParameter: 1
    };

    const result = await TrimNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trimmed).toBeDefined();
  });

  
});