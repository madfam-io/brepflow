
import { describe, it, expect } from 'vitest';
import { DivideNode } from './divide.node';
import { createTestContext } from '../test-utils';

describe('DivideNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      a: undefined,
      b: undefined
    } as any;
    const params = {

    } as any;

    const result = await DivideNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
