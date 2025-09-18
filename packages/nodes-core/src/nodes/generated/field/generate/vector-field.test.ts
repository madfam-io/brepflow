
import { describe, it, expect } from 'vitest';
import { VectorFieldNode } from './vectorfield-node';
import { createTestContext } from '../test-utils';

describe('VectorFieldNode', () => {
  it('should create VectorField', async () => {
    const context = createTestContext();
    const inputs = {
      domain: /* test value */
    };
    const params = {
      expressionX: "y",
      expressionY: "-x",
      expressionZ: "0"
    };

    const result = await VectorFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});