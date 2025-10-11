
import { describe, it, expect } from 'vitest';
import { StandardDeviationNode } from './standard-deviation.node';
import { createTestContext } from '../test-utils';

describe('StandardDeviationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {
      sample: false
    } as any;

    const result = await StandardDeviationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
