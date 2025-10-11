
import { describe, it, expect } from 'vitest';
import { DeformNode } from './deform.node';
import { createTestContext } from '../test-utils';

describe('DeformNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      method: "bend",
      amount: 1
    } as any;

    const result = await DeformNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
