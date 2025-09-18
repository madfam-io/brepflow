
import { describe, it, expect } from 'vitest';
import { IsEqualNode } from './isequal-node';
import { createTestContext } from '../test-utils';

describe('IsEqualNode', () => {
  it('should create IsEqual', async () => {
    const context = createTestContext();
    const inputs = {
      a: null,
      b: null
    };
    const params = {
      tolerance: 0.0001
    };

    const result = await IsEqualNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.equal).toBeDefined();
  });

  
});