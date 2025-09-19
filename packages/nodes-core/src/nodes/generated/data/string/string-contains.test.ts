
import { describe, it, expect } from 'vitest';
import { StringContainsNode } from './stringcontains.node';
import { createTestContext } from './../../test-utils';

describe('StringContainsNode', () => {
  it('should create StringContains', async () => {
    const context = createTestContext();
    const inputs = {
      string: null,
      search: null
    };
    const params = {
      caseSensitive: true
    };

    const result = await StringContainsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.contains).toBeDefined();
    expect(result.index).toBeDefined();
  });

  
});