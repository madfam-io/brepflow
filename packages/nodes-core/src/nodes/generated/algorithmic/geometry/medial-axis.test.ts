
import { describe, it, expect } from 'vitest';
import { MedialAxisNode } from './medialaxis-node';
import { createTestContext } from '../test-utils';

describe('MedialAxisNode', () => {
  it('should create MedialAxis', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */
    };
    const params = {
      resolution: 0.1,
      pruning: 0.1,
      simplify: true
    };

    const result = await MedialAxisNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.skeleton).toBeDefined();
    expect(result.branchPoints).toBeDefined();
    expect(result.endpoints).toBeDefined();
  });

  
});