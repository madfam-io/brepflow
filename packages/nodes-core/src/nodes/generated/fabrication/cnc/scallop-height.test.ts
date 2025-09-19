
import { describe, it, expect } from 'vitest';
import { ScallopHeightNode } from './scallopheight.node';
import { createTestContext } from './../../test-utils';

describe('ScallopHeightNode', () => {
  it('should create ScallopHeight', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      ballRadius: 3,
      stepover: 1
    };

    const result = await ScallopHeightNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.scallopMap).toBeDefined();
    expect(result.maxScallop).toBeDefined();
  });

  
});