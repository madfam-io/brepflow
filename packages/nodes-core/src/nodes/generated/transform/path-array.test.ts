
import { describe, it, expect } from 'vitest';
import { PathArrayNode } from './path-array.node';
import { createTestContext } from '../test-utils';

describe('PathArrayNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined,
      path: undefined
    } as any;
    const params = {
      count: 10,
      alignToPath: true,
      spacing: "equal",
      distance: 50,
      merge: false
    } as any;

    const result = await PathArrayNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
