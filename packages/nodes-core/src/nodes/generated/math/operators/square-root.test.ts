
import { describe, it, expect } from 'vitest';
import { SquareRootNode } from './squareroot.node';
import { createTestContext } from './../../test-utils';

describe('SquareRootNode', () => {
  it('should create SquareRoot', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await SquareRootNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});