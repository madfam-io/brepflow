
import { describe, it, expect } from 'vitest';
import { RangeNode } from './range.node';
import { createTestContext } from '../test-utils';

describe('RangeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      values: undefined
    } as any;
    const params = {

    } as any;

    const result = await RangeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
