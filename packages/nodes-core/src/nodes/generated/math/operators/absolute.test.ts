
import { describe, it, expect } from 'vitest';
import { AbsoluteNode } from './absolute.node';
import { createTestContext } from '../test-utils';

describe('AbsoluteNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await AbsoluteNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
