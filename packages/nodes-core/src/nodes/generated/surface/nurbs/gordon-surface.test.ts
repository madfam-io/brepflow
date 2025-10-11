
import { describe, it, expect } from 'vitest';
import { GordonSurfaceNode } from './gordon-surface.node';
import { createTestContext } from '../test-utils';

describe('GordonSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      uCurves: undefined,
      vCurves: undefined
    } as any;
    const params = {

    } as any;

    const result = await GordonSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
