
import { describe, it, expect } from 'vitest';
import { SignNode } from './sign.node';
import { createTestContext } from '../test-utils';

describe('SignNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await SignNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
