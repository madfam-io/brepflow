
import { describe, it, expect } from 'vitest';
import { FieldOptimizeNode } from './field-optimize.node';
import { createTestContext } from '../test-utils';

describe('FieldOptimizeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      iterations: 100,
      objective: "\"minimize\"",
      learningRate: 0.01
    } as any;

    const result = await FieldOptimizeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
