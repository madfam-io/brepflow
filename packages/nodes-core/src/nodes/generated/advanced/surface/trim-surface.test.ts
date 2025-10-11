
import { describe, it, expect } from 'vitest';
import { TrimSurfaceNode } from './trim-surface.node';
import { createTestContext } from '../test-utils';

describe('TrimSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined,
      trimmingCurves: undefined
    } as any;
    const params = {
      keepRegion: "inside",
      projectCurves: true
    } as any;

    const result = await TrimSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
