
import { describe, it, expect } from 'vitest';
import { StringSubstringNode } from './stringsubstring.node';
import { createTestContext } from './../../test-utils';

describe('StringSubstringNode', () => {
  it('should create StringSubstring', async () => {
    const context = createTestContext();
    const inputs = {
      string: null,
      start: null
    };
    const params = {
      
    };

    const result = await StringSubstringNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.substring).toBeDefined();
  });

  
});