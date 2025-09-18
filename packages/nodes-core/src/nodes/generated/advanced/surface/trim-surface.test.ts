
import { describe, it, expect } from 'vitest';
import { TrimSurfaceNode } from './trimsurface-node';
import { createTestContext } from '../test-utils';

describe('TrimSurfaceNode', () => {
  it('should create TrimSurface', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null,
      trimmingCurves: null
    };
    const params = {
      keepRegion: "inside",
      projectCurves: true
    };

    const result = await TrimSurfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trimmedSurface).toBeDefined();
  });

  
});