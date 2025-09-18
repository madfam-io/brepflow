
import { describe, it, expect } from 'vitest';
import { UnfoldNode } from './unfold-node';
import { createTestContext } from '../test-utils';

describe('UnfoldNode', () => {
  it('should create Unfold', async () => {
    const context = createTestContext();
    const inputs = {
      foldedShape: /* test value */
    };
    const params = {
      kFactor: 0.44,
      bendAllowance: 0,
      autoRelief: true
    };

    const result = await UnfoldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.flatPattern).toBeDefined();
    expect(result.bendLines).toBeDefined();
    expect(result.bendTable).toBeDefined();
  });

  
});