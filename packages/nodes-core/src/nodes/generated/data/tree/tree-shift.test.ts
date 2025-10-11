
import { describe, it, expect } from 'vitest';
import { TreeShiftNode } from './tree-shift.node';
import { createTestContext } from '../test-utils';

describe('TreeShiftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined,
      offset: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreeShiftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
