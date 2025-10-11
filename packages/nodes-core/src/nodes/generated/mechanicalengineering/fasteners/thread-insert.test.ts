
import { describe, it, expect } from 'vitest';
import { ThreadInsertNode } from './thread-insert.node';
import { createTestContext } from '../test-utils';

describe('ThreadInsertNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      position: undefined
    } as any;
    const params = {
      threadSize: "M5",
      length: 10,
      type: "heat-set"
    } as any;

    const result = await ThreadInsertNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
