
import { describe, it, expect } from 'vitest';
import { DoubleDoorNode } from './double-door.node';
import { createTestContext } from '../test-utils';

describe('DoubleDoorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      position: undefined
    } as any;
    const params = {
      totalWidth: 1800,
      height: 2100,
      activeLeaf: "both"
    } as any;

    const result = await DoubleDoorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
