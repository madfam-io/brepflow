
import { describe, it, expect } from 'vitest';
import { CurveSpiralNode } from './curve-spiral.node';
import { createTestContext } from '../test-utils';

describe('CurveSpiralNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      showCenter: true
    } as any;

    const result = await CurveSpiralNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
