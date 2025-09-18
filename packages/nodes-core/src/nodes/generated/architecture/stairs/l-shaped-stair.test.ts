
import { describe, it, expect } from 'vitest';
import { LShapedStairNode } from './lshapedstair-node';
import { createTestContext } from '../test-utils';

describe('LShapedStairNode', () => {
  it('should create LShapedStair', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: null
    };
    const params = {
      totalRise: 3000,
      landingSize: 1200,
      turnDirection: "right"
    };

    const result = await LShapedStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.staircase).toBeDefined();
    expect(result.landing).toBeDefined();
  });

  
});