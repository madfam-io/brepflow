
import { describe, it, expect } from 'vitest';
import { OffsetNode } from './offset.node';
import { createTestContext } from '../test-utils';

describe('OffsetNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      distance: 10,
      side: "right"
    } as any;

    const result = await OffsetNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
