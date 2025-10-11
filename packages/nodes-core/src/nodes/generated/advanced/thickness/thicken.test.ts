
import { describe, it, expect } from 'vitest';
import { ThickenNode } from './thicken.node';
import { createTestContext } from '../test-utils';

describe('ThickenNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      thickness: 5,
      direction: "normal",
      autoClose: true
    } as any;

    const result = await ThickenNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
