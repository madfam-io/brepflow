
import { describe, it, expect } from 'vitest';
import { CurveOnSurfaceNode } from './curve-on-surface.node';
import { createTestContext } from '../test-utils';

describe('CurveOnSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined,
      uvPoints: undefined
    } as any;
    const params = {

    } as any;

    const result = await CurveOnSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
