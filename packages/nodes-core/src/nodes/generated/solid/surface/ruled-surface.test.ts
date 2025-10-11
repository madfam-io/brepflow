
import { describe, it, expect } from 'vitest';
import { RuledSurfaceNode } from './ruled-surface.node';
import { createTestContext } from '../test-utils';

describe('RuledSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve1: undefined,
      curve2: undefined
    } as any;
    const params = {

    } as any;

    const result = await RuledSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
