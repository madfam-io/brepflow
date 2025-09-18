
import { describe, it, expect } from 'vitest';
import { TangentNode } from './tangent-node';
import { createTestContext } from '../test-utils';

describe('TangentNode', () => {
  it('should create Tangent', async () => {
    const context = createTestContext();
    const inputs = {
      angle: /* test value */
    };
    const params = {
      angleUnit: "radians"
    };

    const result = await TangentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});