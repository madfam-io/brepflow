
import { describe, it, expect } from 'vitest';
import { SineNode } from './sine-node';
import { createTestContext } from '../test-utils';

describe('SineNode', () => {
  it('should create Sine', async () => {
    const context = createTestContext();
    const inputs = {
      angle: /* test value */
    };
    const params = {
      angleUnit: "radians"
    };

    const result = await SineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});