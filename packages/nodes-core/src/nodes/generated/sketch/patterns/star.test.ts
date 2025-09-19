
import { describe, it, expect } from 'vitest';
import { StarNode } from './star.node';
import { createTestContext } from './../../test-utils';

describe('StarNode', () => {
  it('should create Star', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      points: 5,
      outerRadius: 100,
      innerRadius: 40
    };

    const result = await StarNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.star).toBeDefined();
  });

  
});