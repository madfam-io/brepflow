
import { describe, it, expect } from 'vitest';
import { TuringPatternNode } from './turingpattern-node';
import { createTestContext } from '../test-utils';

describe('TuringPatternNode', () => {
  it('should create TuringPattern', async () => {
    const context = createTestContext();
    const inputs = {
      domain: null
    };
    const params = {
      model: "gray-scott",
      iterations: 1000,
      resolution: 100
    };

    const result = await TuringPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});