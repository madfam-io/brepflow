
import { describe, it, expect } from 'vitest';
import { ScaleNode } from './scale-node';
import { createTestContext } from '../test-utils';

describe('ScaleNode', () => {
  it('should create Scale', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      uniform: true,
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      copy: true
    };

    const result = await ScaleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.scaled).toBeDefined();
  });

  
});