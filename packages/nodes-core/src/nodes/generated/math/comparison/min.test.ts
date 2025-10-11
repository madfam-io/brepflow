
import { describe, it, expect } from 'vitest';
import { MinNode } from './min.node';
import { createTestContext } from '../test-utils';

describe('MinNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await MinNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
