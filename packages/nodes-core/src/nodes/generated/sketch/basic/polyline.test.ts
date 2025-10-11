
import { describe, it, expect } from 'vitest';
import { PolylineNode } from './polyline.node';
import { createTestContext } from '../test-utils';

describe('PolylineNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      closed: false
    } as any;

    const result = await PolylineNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
