
import { describe, it, expect } from 'vitest';
import { NetworkSurfaceNode } from './network-surface.node';
import { createTestContext } from '../test-utils';

describe('NetworkSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      uCurves: undefined,
      vCurves: undefined
    } as any;
    const params = {
      continuity: "G1",
      tolerance: 0.01
    } as any;

    const result = await NetworkSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
