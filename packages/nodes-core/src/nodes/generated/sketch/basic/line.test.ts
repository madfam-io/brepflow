
import { describe, it, expect } from 'vitest';
import { LineNode } from './line.node';
import { createTestContext } from './../../test-utils';

describe('LineNode', () => {
  it('should create Line', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      startX: 0,
      startY: 0,
      startZ: 0,
      endX: 100,
      endY: 0,
      endZ: 0
    };

    const result = await LineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.edge).toBeDefined();
  });

  
});