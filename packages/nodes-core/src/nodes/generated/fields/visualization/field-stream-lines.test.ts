
import { describe, it, expect } from 'vitest';
import { FieldStreamLinesNode } from './fieldstreamlines-node';
import { createTestContext } from '../test-utils';

describe('FieldStreamLinesNode', () => {
  it('should create FieldStreamLines', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      seedCount: 20,
      stepSize: 0.1,
      maxSteps: 100
    };

    const result = await FieldStreamLinesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.streamlines).toBeDefined();
  });

  
});