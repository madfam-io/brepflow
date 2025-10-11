
import { describe, it, expect } from 'vitest';
import { MedialAxisNode } from './medial-axis.node';
import { createTestContext } from '../test-utils';

describe('MedialAxisNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      resolution: 0.1,
      pruning: 0.1,
      simplify: true
    } as any;

    const result = await MedialAxisNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
