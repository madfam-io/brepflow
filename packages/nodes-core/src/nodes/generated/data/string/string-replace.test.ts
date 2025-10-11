
import { describe, it, expect } from 'vitest';
import { StringReplaceNode } from './string-replace.node';
import { createTestContext } from '../test-utils';

describe('StringReplaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      string: undefined,
      search: undefined,
      replace: undefined
    } as any;
    const params = {
      global: true
    } as any;

    const result = await StringReplaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
