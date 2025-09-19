
import { describe, it, expect } from 'vitest';
import { ArcNode } from './arc.node';
import { createTestContext } from './../../test-utils';

describe('ArcNode', () => {
  it('should create Arc', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      radius: 50,
      startAngle: 0,
      endAngle: 90
    };

    const result = await ArcNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.edge).toBeDefined();
  });

  
});