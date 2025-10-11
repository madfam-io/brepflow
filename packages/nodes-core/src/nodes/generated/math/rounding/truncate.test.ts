
import { describe, it, expect } from 'vitest';
import { TruncateNode } from './truncate.node';
import { createTestContext } from '../test-utils';

describe('TruncateNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await TruncateNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
