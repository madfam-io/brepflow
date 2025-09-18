
import { describe, it, expect } from 'vitest';
import { NeuralPatternNode } from './neuralpattern-node';
import { createTestContext } from '../test-utils';

describe('NeuralPatternNode', () => {
  it('should create NeuralPattern', async () => {
    const context = createTestContext();
    const inputs = {
      inputPoints: null
    };
    const params = {
      neurons: 100,
      connections: 3
    };

    const result = await NeuralPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.network).toBeDefined();
  });

  
});