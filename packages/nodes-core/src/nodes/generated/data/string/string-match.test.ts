
import { describe, it, expect } from 'vitest';
import { StringMatchNode } from './string-match.node';
import { createTestContext } from '../test-utils';

describe('StringMatchNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      string: undefined,
      pattern: undefined
    } as any;
    const params = {
      global: false
    } as any;

    const result = await StringMatchNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
