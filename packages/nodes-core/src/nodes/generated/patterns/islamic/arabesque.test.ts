
import { describe, it, expect } from 'vitest';
import { ArabesqueNode } from './arabesque.node';
import { createTestContext } from './../../test-utils';

describe('ArabesqueNode', () => {
  it('should create Arabesque', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      complexity: 3,
      symmetry: 6
    };

    const result = await ArabesqueNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});