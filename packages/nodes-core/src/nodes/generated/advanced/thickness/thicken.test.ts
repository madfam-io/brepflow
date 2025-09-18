
import { describe, it, expect } from 'vitest';
import { ThickenNode } from './thicken-node';
import { createTestContext } from '../test-utils';

describe('ThickenNode', () => {
  it('should create Thicken', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */
    };
    const params = {
      thickness: 5,
      direction: "normal",
      autoClose: true
    };

    const result = await ThickenNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});