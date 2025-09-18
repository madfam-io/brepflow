
import { describe, it, expect } from 'vitest';
import { MoveNode } from './move-node';
import { createTestContext } from '../test-utils';

describe('MoveNode', () => {
  it('should create Move', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      x: 0,
      y: 0,
      z: 0,
      copy: true
    };

    const result = await MoveNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.moved).toBeDefined();
  });

  
});