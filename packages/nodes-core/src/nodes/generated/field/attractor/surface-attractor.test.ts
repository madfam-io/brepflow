
import { describe, it, expect } from 'vitest';
import { SurfaceAttractorNode } from './surface-attractor.node';
import { createTestContext } from '../test-utils';

describe('SurfaceAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surfaces: undefined
    } as any;
    const params = {
      strength: 1,
      radius: 30,
      falloff: "smooth"
    } as any;

    const result = await SurfaceAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
