
import { describe, it, expect } from 'vitest';
import { GrammarShapesNode } from './grammar-shapes.node';
import { createTestContext } from '../test-utils';

describe('GrammarShapesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapeA: undefined
    } as any;
    const params = {
      grammar: "A->AB,B->A",
      iterations: 5,
      seed: "A"
    } as any;

    const result = await GrammarShapesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
