
import { describe, it, expect } from 'vitest';
import { StringConcatNode } from './string-concat.node';
import { createTestContext } from '../test-utils';

describe('StringConcatNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      strings: undefined
    } as any;
    const params = {
      separator: ""
    } as any;

    const result = await StringConcatNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
