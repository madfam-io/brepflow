
import { describe, it, expect } from 'vitest';
import { FieldCorrelationNode } from './fieldcorrelation-node';
import { createTestContext } from '../test-utils';

describe('FieldCorrelationNode', () => {
  it('should create FieldCorrelation', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      sampleCount: 1000
    };

    const result = await FieldCorrelationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.correlation).toBeDefined();
    expect(result.covariance).toBeDefined();
  });

  
});