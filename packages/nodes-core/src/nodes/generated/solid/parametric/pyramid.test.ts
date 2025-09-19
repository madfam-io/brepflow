
import { describe, it, expect } from 'vitest';
import { PyramidNode } from './pyramid.node';
import { createTestContext } from './../../test-utils';

describe('PyramidNode', () => {
  it('should create Pyramid', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      baseWidth: 100,
      baseDepth: 100,
      height: 100,
      topWidth: 0,
      topDepth: 0
    };

    const result = await PyramidNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});