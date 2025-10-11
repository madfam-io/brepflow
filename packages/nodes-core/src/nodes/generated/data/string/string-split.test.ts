
import { describe, it, expect } from 'vitest';
import { StringSplitNode } from './string-split.node';
import { createTestContext } from '../test-utils';

describe('StringSplitNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      string: undefined
    } as any;
    const params = {
      delimiter: ","
    } as any;

    const result = await StringSplitNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
