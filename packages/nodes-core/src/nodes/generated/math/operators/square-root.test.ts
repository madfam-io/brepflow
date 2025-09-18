
import { describe, it, expect } from 'vitest';
import { SquareRootNode } from './squareroot-node';
import { createTestContext } from '../test-utils';

describe('SquareRootNode', () => {
  it('should create SquareRoot', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */
    };
    const params = {
      
    };

    const result = await SquareRootNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});