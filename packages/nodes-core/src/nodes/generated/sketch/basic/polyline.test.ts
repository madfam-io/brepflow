
import { describe, it, expect } from 'vitest';
import { PolylineNode } from './polyline-node';
import { createTestContext } from '../test-utils';

describe('PolylineNode', () => {
  it('should create Polyline', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      closed: false
    };

    const result = await PolylineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wire).toBeDefined();
  });

  
});