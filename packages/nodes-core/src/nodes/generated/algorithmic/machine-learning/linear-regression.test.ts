
import { describe, it, expect } from 'vitest';
import { LinearRegressionNode } from './linear-regression.node';
import { createTestContext } from '../test-utils';

describe('LinearRegressionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      trainingData: undefined,
      features: undefined,
      target: undefined
    } as any;
    const params = {
      regularization: "none",
      alpha: 1,
      normalize: true
    } as any;

    const result = await LinearRegressionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
