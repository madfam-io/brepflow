
import { describe, it, expect } from 'vitest';
import { AlignNode } from './align.node';
import { createTestContext } from '../test-utils';

describe('AlignNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined
    } as any;
    const params = {
      alignX: "center",
      alignY: "center",
      alignZ: "none"
    } as any;

    const result = await AlignNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
