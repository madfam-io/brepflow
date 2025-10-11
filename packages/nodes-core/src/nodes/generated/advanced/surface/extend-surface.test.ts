
import { describe, it, expect } from 'vitest';
import { ExtendSurfaceNode } from './extend-surface.node';
import { createTestContext } from '../test-utils';

describe('ExtendSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined,
      edges: undefined
    } as any;
    const params = {
      extensionLength: 10,
      extensionType: "natural"
    } as any;

    const result = await ExtendSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
