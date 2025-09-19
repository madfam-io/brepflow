
import { describe, it, expect } from 'vitest';
import { UniversalNode } from './universal.node';
import { createTestContext } from './../../test-utils';

describe('UniversalNode', () => {
  it('should create Universal', async () => {
    const context = createTestContext();
    const inputs = {
      part1: null,
      part2: null,
      center: null
    };
    const params = {
      
    };

    const result = await UniversalNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});