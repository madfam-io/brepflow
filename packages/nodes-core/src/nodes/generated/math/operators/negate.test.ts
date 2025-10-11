
import { describe, it, expect } from 'vitest';
import { NegateNode } from './negate.node';
import { createTestContext } from '../test-utils';

describe('NegateNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await NegateNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
