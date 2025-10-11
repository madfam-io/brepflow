
import { describe, it, expect } from 'vitest';
import { SurfaceClosestPointNode } from './surface-closest-point.node';
import { createTestContext } from '../test-utils';

describe('SurfaceClosestPointNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined,
      point: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      showConnection: true
    } as any;

    const result = await SurfaceClosestPointNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
