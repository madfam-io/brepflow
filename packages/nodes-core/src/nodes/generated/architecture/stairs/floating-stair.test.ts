
import { describe, it, expect } from 'vitest';
import { FloatingStairNode } from './floating-stair.node';
import { createTestContext } from '../test-utils';

describe('FloatingStairNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wallLine: undefined,
      riseRun: undefined
    } as any;
    const params = {
      cantileverDepth: 100,
      treadThickness: 60
    } as any;

    const result = await FloatingStairNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
