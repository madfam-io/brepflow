
import { describe, it, expect } from 'vitest';
import { PipeNode } from './pipe-node';
import { createTestContext } from '../test-utils';

describe('PipeNode', () => {
  it('should create Pipe', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      outerRadius: 50,
      innerRadius: 40,
      height: 100
    };

    const result = await PipeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});