
import { describe, it, expect } from 'vitest';
import { IsoContourNode } from './isocontour-node';
import { createTestContext } from '../test-utils';

describe('IsoContourNode', () => {
  it('should create IsoContour', async () => {
    const context = createTestContext();
    const inputs = {
      field: null
    };
    const params = {
      value: 0.5,
      smooth: true
    };

    const result = await IsoContourNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.contours).toBeDefined();
  });

  
});