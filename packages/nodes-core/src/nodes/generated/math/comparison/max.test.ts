
import { describe, it, expect } from 'vitest';
import { MaxNode } from './max.node';
import { createTestContext } from '../test-utils';

describe('MaxNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await MaxNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
