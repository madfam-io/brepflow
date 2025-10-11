
import { describe, it, expect } from 'vitest';
import { VectorFieldNode } from './vector-field.node';
import { createTestContext } from '../test-utils';

describe('VectorFieldNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      domain: undefined
    } as any;
    const params = {
      expressionX: "y",
      expressionY: "-x",
      expressionZ: "0"
    } as any;

    const result = await VectorFieldNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
