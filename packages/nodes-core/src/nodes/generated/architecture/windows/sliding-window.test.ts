
import { describe, it, expect } from 'vitest';
import { SlidingWindowNode } from './sliding-window.node';
import { createTestContext } from '../test-utils';

describe('SlidingWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      opening: undefined
    } as any;
    const params = {
      panels: 2,
      operablePanel: "left"
    } as any;

    const result = await SlidingWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
