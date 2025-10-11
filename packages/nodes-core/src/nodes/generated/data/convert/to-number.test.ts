
import { describe, it, expect } from 'vitest';
import { ToNumberNode } from './to-number.node';
import { createTestContext } from '../test-utils';

describe('ToNumberNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined
    } as any;
    const params = {

    } as any;

    const result = await ToNumberNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
