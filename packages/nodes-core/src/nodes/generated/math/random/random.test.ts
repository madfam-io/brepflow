
import { describe, it, expect } from 'vitest';
import { RandomNode } from './random.node';
import { createTestContext } from '../test-utils';

describe('RandomNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      seed: -1
    } as any;

    const result = await RandomNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
