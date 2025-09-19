
import { describe, it, expect } from 'vitest';
import { LSystem2DNode } from './lsystem2d-node';
import { createTestContext } from './../../test-utils';

describe('LSystem2DNode', () => {
  it('should create LSystem2D', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: null
    };
    const params = {
      axiom: "F",
      rules: "F=F+F-F-F+F",
      angle: 90,
      iterations: 3
    };

    const result = await LSystem2DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pattern).toBeDefined();
  });

  
});