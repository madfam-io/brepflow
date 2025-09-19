
import { describe, it, expect } from 'vitest';
import { ThreadedHoleNode } from './threadedhole.node';
import { createTestContext } from './../../test-utils';

describe('ThreadedHoleNode', () => {
  it('should create ThreadedHole', async () => {
    const context = createTestContext();
    const inputs = {
      solid: null,
      position: null
    };
    const params = {
      threadSize: "M6",
      pitch: 1,
      depth: 20,
      threadClass: "6H"
    };

    const result = await ThreadedHoleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});