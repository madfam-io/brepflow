
import { describe, it, expect } from 'vitest';
import { MarkovChainNode } from './markovchain-node';
import { createTestContext } from '../test-utils';

describe('MarkovChainNode', () => {
  it('should create MarkovChain', async () => {
    const context = createTestContext();
    const inputs = {
      transitionMatrix: null
    };
    const params = {
      states: 5,
      steps: 100,
      seed: 0
    };

    const result = await MarkovChainNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sequence).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});