
import { describe, it, expect } from 'vitest';
import { ExponentialNode } from './exponential.node';
import { createTestContext } from '../test-utils';

describe('ExponentialNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await ExponentialNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
