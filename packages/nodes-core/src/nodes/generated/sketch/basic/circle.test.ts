
import { describe, it, expect } from 'vitest';
import { CircleNode } from './circle-node';
import { createTestContext } from '../test-utils';

describe('CircleNode', () => {
  it('should create Circle', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      radius: 50,
      filled: true
    };

    const result = await CircleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});