
import { describe, it, expect } from 'vitest';
import { SubdivisionSurfaceNode } from './subdivision-surface.node';
import { createTestContext } from '../test-utils';

describe('SubdivisionSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      controlMesh: undefined
    } as any;
    const params = {
      scheme: "catmull-clark",
      levels: 2
    } as any;

    const result = await SubdivisionSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
