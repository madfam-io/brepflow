
import { describe, it, expect } from 'vitest';
import { SteppedShaftNode } from './stepped-shaft.node';
import { createTestContext } from '../test-utils';

describe('SteppedShaftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      centerline: undefined
    } as any;
    const params = {
      sections: "20x50,25x80,20x30",
      chamfers: true,
      filletRadius: 1
    } as any;

    const result = await SteppedShaftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
