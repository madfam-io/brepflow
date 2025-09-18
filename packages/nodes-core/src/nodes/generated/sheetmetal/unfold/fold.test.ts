
import { describe, it, expect } from 'vitest';
import { FoldNode } from './fold-node';
import { createTestContext } from '../test-utils';

describe('FoldNode', () => {
  it('should create Fold', async () => {
    const context = createTestContext();
    const inputs = {
      flatPattern: /* test value */,
      bendLines: /* test value */,
      bendAngles: /* test value */
    };
    const params = {
      foldSequence: "auto",
      partialFold: 1
    };

    const result = await FoldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.foldedShape).toBeDefined();
  });

  
});