
import { describe, it, expect } from 'vitest';
import { SlidingWindowNode } from './slidingwindow-node';
import { createTestContext } from '../test-utils';

describe('SlidingWindowNode', () => {
  it('should create SlidingWindow', async () => {
    const context = createTestContext();
    const inputs = {
      opening: null
    };
    const params = {
      panels: 2,
      operablePanel: "left"
    };

    const result = await SlidingWindowNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.window).toBeDefined();
    expect(result.panels).toBeDefined();
  });

  
});