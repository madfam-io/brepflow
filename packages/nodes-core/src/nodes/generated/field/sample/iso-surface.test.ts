
import { describe, it, expect } from 'vitest';
import { IsoSurfaceNode } from './iso-surface.node';
import { createTestContext } from '../test-utils';

describe('IsoSurfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {
      value: 0.5,
      resolution: 50
    } as any;

    const result = await IsoSurfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
