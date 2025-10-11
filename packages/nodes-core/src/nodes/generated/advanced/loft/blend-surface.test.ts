
import { describe, it, expect } from 'vitest';
import { BlendSurfaceNode } from './blend-surface.node';
import { createTestContext } from '../test-utils';

describe('BlendSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface1: undefined,
      surface2: undefined
    } as any;
    const params = {
      continuity: "G1",
      blendFactor: 0.5
    } as any;

    const result = await BlendSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
