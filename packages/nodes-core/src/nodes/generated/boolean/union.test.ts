
import { describe, it, expect } from 'vitest';
import { UnionNode } from './union.node';
import { createTestContext } from './../test-utils';

describe('UnionNode', () => {
  it('should create Union', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null
    };
    const params = {
      keepOriginals: false,
      fuzzyValue: 1e-7
    };

    const result = await UnionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
  it('should handle Simple Union', async () => {
    const context = createTestContext();
    const params = {
      "keepOriginals": false
    };

    const result = await UnionNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
});