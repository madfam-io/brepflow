
import { describe, it, expect } from 'vitest';
import { FloatingStairNode } from './floatingstair-node';
import { createTestContext } from '../test-utils';

describe('FloatingStairNode', () => {
  it('should create FloatingStair', async () => {
    const context = createTestContext();
    const inputs = {
      wallLine: null,
      riseRun: null
    };
    const params = {
      cantileverDepth: 100,
      treadThickness: 60
    };

    const result = await FloatingStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.floatingStair).toBeDefined();
    expect(result.anchors).toBeDefined();
  });

  
});