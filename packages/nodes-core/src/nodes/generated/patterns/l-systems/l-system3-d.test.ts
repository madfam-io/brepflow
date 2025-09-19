
import { describe, it, expect } from 'vitest';
import { LSystem3DNode } from './lsystem3d-node';
import { createTestContext } from './../../test-utils';

describe('LSystem3DNode', () => {
  it('should create LSystem3D', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: null
    };
    const params = {
      axiom: "F",
      rules: "F=F[+F]F[-F]F",
      angle: 25,
      iterations: 4
    };

    const result = await LSystem3DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.branches).toBeDefined();
  });

  
});