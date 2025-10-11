
import { describe, it, expect } from 'vitest';
import { StringLengthNode } from './string-length.node';
import { createTestContext } from '../test-utils';

describe('StringLengthNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      string: undefined
    } as any;
    const params = {

    } as any;

    const result = await StringLengthNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
