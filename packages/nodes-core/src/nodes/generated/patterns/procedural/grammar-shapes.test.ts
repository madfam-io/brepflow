
import { describe, it, expect } from 'vitest';
import { GrammarShapesNode } from './grammarshapes-node';
import { createTestContext } from '../test-utils';

describe('GrammarShapesNode', () => {
  it('should create GrammarShapes', async () => {
    const context = createTestContext();
    const inputs = {
      shapeA: null
    };
    const params = {
      grammar: "A->AB,B->A",
      iterations: 5,
      seed: "A"
    };

    const result = await GrammarShapesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});