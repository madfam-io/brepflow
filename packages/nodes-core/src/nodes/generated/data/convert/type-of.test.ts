
import { describe, it, expect } from 'vitest';
import { TypeOfNode } from './type-of.node';
import { createTestContext } from '../test-utils';

describe('TypeOfNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {

    } as any;

    const result = await TypeOfNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
