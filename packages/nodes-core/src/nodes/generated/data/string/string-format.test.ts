
import { describe, it, expect } from 'vitest';
import { StringFormatNode } from './string-format.node';
import { createTestContext } from '../test-utils';

describe('StringFormatNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      template: undefined,
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await StringFormatNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
