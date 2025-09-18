
import { describe, it, expect } from 'vitest';
import { TangentNode } from './tangent-node';
import { createTestContext } from '../test-utils';

describe('TangentNode', () => {
  it('should create Tangent', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: /* test value */,
      entity2: /* test value */
    };
    const params = {
      inside: false
    };

    const result = await TangentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.constrained).toBeDefined();
    expect(result.constraint).toBeDefined();
  });

  
});