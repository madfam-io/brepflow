
import { describe, it, expect } from 'vitest';
import { BoxNode } from './box.node';
import { createTestContext } from './../../test-utils';

describe('BoxNode', () => {
  it('should create Box', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      width: 100,
      depth: 100,
      height: 100,
      centerX: 0,
      centerY: 0,
      centerZ: 0
    };

    const result = await BoxNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
  it('should handle Unit Cube', async () => {
    const context = createTestContext();
    const params = {
      "width": 1,
      "depth": 1,
      "height": 1
    };

    const result = await BoxNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
  
  it('should handle Rectangular Block', async () => {
    const context = createTestContext();
    const params = {
      "width": 200,
      "depth": 100,
      "height": 50
    };

    const result = await BoxNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
});