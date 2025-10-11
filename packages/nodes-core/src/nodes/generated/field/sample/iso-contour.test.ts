
import { describe, it, expect } from 'vitest';
import { IsoContourNode } from './iso-contour.node';
import { createTestContext } from '../test-utils';

describe('IsoContourNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {
      value: 0.5,
      smooth: true
    } as any;

    const result = await IsoContourNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
