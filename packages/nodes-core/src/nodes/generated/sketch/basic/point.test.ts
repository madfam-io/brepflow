
import { describe, it, expect } from 'vitest';
import { PointNode } from './point.node';
import { createTestContext } from './../../test-utils';

describe('PointNode', () => {
  it('should create Point', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      x: 0,
      y: 0,
      z: 0
    };

    const result = await PointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.point).toBeDefined();
  });

  
});