
import { describe, it, expect } from 'vitest';
import { ListShiftNode } from './list-shift.node';
import { createTestContext } from '../test-utils';

describe('ListShiftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      list: undefined,
      offset: undefined
    } as any;
    const params = {
      wrap: true
    } as any;

    const result = await ListShiftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
