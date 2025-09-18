
import { describe, it, expect } from 'vitest';
import { ClosedCornerNode } from './closedcorner-node';
import { createTestContext } from '../test-utils';

describe('ClosedCornerNode', () => {
  it('should create ClosedCorner', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      faces: null
    };
    const params = {
      cornerType: "overlap",
      gapDistance: 0,
      overlapRatio: 0.5
    };

    const result = await ClosedCornerNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});