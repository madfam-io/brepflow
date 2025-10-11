
import { describe, it, expect } from 'vitest';
import { BezierSurfaceNode } from './bezier-surface.node';
import { createTestContext } from '../test-utils';

describe('BezierSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: undefined
    } as any;
    const params = {
      uDegree: 3,
      vDegree: 3
    } as any;

    const result = await BezierSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
