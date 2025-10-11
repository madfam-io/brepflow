
import { describe, it, expect } from 'vitest';
import { SplineNode } from './spline.node';
import { createTestContext } from '../test-utils';

describe('SplineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      degree: 3,
      closed: false,
      smooth: true
    } as any;

    const result = await SplineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
