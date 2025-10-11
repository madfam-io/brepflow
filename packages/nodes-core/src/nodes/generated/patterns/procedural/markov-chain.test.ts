
import { describe, it, expect } from 'vitest';
import { MarkovChainNode } from './markov-chain.node';
import { createTestContext } from '../test-utils';

describe('MarkovChainNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      transitionMatrix: undefined
    } as any;
    const params = {
      states: 5,
      steps: 100,
      seed: 0
    } as any;

    const result = await MarkovChainNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
