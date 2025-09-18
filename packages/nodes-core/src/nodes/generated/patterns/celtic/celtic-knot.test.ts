
import { describe, it, expect } from 'vitest';
import { CelticKnotNode } from './celticknot-node';
import { createTestContext } from '../test-utils';

describe('CelticKnotNode', () => {
  it('should create CelticKnot', async () => {
    const context = createTestContext();
    const inputs = {
      path: /* test value */
    };
    const params = {
      type: "trinity",
      width: 2
    };

    const result = await CelticKnotNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.knot).toBeDefined();
  });

  
});