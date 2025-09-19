
import { describe, it, expect } from 'vitest';
import { FieldOptimizeNode } from './fieldoptimize.node';
import { createTestContext } from './../../test-utils';

describe('FieldOptimizeNode', () => {
  it('should create FieldOptimize', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      iterations: 100,
      objective: "\"minimize\"",
      learningRate: 0.01
    };

    const result = await FieldOptimizeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.optimizedField).toBeDefined();
    expect(result.convergence).toBeDefined();
  });

  
});