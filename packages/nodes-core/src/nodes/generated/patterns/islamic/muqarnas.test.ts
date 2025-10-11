
import { describe, it, expect } from 'vitest';
import { MuqarnasNode } from './muqarnas.node';
import { createTestContext } from '../test-utils';

describe('MuqarnasNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      base: undefined
    } as any;
    const params = {
      levels: 3,
      cellType: "mixed"
    } as any;

    const result = await MuqarnasNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
