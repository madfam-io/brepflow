
import { describe, it, expect } from 'vitest';
import { HoneycombPatternNode } from './honeycombpattern.node';
import { createTestContext } from './../../test-utils';

describe('HoneycombPatternNode', () => {
  it('should create HoneycombPattern', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      cellSize: 10,
      wallThickness: 1
    };

    const result = await HoneycombPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.honeycomb).toBeDefined();
  });

  
});