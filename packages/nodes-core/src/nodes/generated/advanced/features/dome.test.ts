
import { describe, it, expect } from 'vitest';
import { DomeNode } from './dome-node';
import { createTestContext } from '../test-utils';

describe('DomeNode', () => {
  it('should create Dome', async () => {
    const context = createTestContext();
    const inputs = {
      face: /* test value */
    };
    const params = {
      height: 10,
      constraintType: "tangent"
    };

    const result = await DomeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.dome).toBeDefined();
  });

  
});