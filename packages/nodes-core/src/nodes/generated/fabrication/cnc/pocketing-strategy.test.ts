
import { describe, it, expect } from 'vitest';
import { PocketingStrategyNode } from './pocketingstrategy-node';
import { createTestContext } from '../test-utils';

describe('PocketingStrategyNode', () => {
  it('should create PocketingStrategy', async () => {
    const context = createTestContext();
    const inputs = {
      pocket: null,
      depth: null
    };
    const params = {
      pattern: "spiral",
      stepdown: 2,
      finishPass: true
    };

    const result = await PocketingStrategyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.roughing).toBeDefined();
    expect(result.finishing).toBeDefined();
  });

  
});