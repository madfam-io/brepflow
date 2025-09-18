
import { describe, it, expect } from 'vitest';
import { StringConcatNode } from './stringconcat-node';
import { createTestContext } from '../test-utils';

describe('StringConcatNode', () => {
  it('should create StringConcat', async () => {
    const context = createTestContext();
    const inputs = {
      strings: null
    };
    const params = {
      separator: ""
    };

    const result = await StringConcatNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});