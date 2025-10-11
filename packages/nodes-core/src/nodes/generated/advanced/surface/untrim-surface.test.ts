
import { describe, it, expect } from 'vitest';
import { UntrimSurfaceNode } from './untrim-surface.node';
import { createTestContext } from '../test-utils';

describe('UntrimSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      trimmedSurface: undefined
    } as any;
    const params = {
      keepHoles: false
    } as any;

    const result = await UntrimSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
