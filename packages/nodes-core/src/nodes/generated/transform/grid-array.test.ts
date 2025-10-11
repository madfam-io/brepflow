
import { describe, it, expect } from 'vitest';
import { GridArrayNode } from './grid-array.node';
import { createTestContext } from '../test-utils';

describe('GridArrayNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      countX: 3,
      countY: 3,
      countZ: 1,
      spacingX: 100,
      spacingY: 100,
      spacingZ: 100,
      merge: false
    } as any;

    const result = await GridArrayNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
