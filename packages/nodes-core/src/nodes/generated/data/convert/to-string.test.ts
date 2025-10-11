
import { describe, it, expect } from 'vitest';
import { ToStringNode } from './to-string.node';
import { createTestContext } from '../test-utils';

describe('ToStringNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {

    } as any;

    const result = await ToStringNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
