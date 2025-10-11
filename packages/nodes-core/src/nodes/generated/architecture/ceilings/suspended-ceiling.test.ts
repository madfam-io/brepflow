
import { describe, it, expect } from 'vitest';
import { SuspendedCeilingNode } from './suspended-ceiling.node';
import { createTestContext } from '../test-utils';

describe('SuspendedCeilingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      roomBoundary: undefined
    } as any;
    const params = {
      tileSize: "600x600",
      suspensionHeight: 300
    } as any;

    const result = await SuspendedCeilingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
