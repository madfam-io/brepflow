
import { describe, it, expect } from 'vitest';
import { MultiplePassesNode } from './multiplepasses-node';
import { createTestContext } from '../test-utils';

describe('MultiplePassesNode', () => {
  it('should create MultiplePasses', async () => {
    const context = createTestContext();
    const inputs = {
      paths: null
    };
    const params = {
      passes: 2,
      powerRamp: false,
      zStep: 0
    };

    const result = await MultiplePassesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.multipassPaths).toBeDefined();
  });

  
});