
import { describe, it, expect } from 'vitest';
import { ToBooleanNode } from './to-boolean.node';
import { createTestContext } from '../test-utils';

describe('ToBooleanNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {

    } as any;

    const result = await ToBooleanNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
