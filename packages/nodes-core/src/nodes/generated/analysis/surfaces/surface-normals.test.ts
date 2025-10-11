
import { describe, it, expect } from 'vitest';
import { SurfaceNormalsNode } from './surface-normals.node';
import { createTestContext } from '../test-utils';

describe('SurfaceNormalsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      density: 20,
      vectorLength: 5,
      showVectors: true
    } as any;

    const result = await SurfaceNormalsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
