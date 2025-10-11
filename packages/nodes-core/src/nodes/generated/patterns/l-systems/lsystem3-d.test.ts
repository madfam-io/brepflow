
import { describe, it, expect } from 'vitest';
import { LSystem3DNode } from './lsystem3-d.node';
import { createTestContext } from '../test-utils';

describe('LSystem3DNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      startPoint: undefined
    } as any;
    const params = {
      axiom: "F",
      rules: "F=F[+F]F[-F]F",
      angle: 25,
      iterations: 4
    } as any;

    const result = await LSystem3DNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
