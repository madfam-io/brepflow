
import { describe, it, expect } from 'vitest';
import { CorrelationNode } from './correlation-node';
import { createTestContext } from '../test-utils';

describe('CorrelationNode', () => {
  it('should create Correlation', async () => {
    const context = createTestContext();
    const inputs = {
      x: /* test value */,
      y: /* test value */
    };
    const params = {
      
    };

    const result = await CorrelationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.correlation).toBeDefined();
  });

  
});