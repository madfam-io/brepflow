
import { describe, it, expect } from 'vitest';
import { BrickPatternNode } from './brick-pattern.node';
import { createTestContext } from '../test-utils';

describe('BrickPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      bond: "running",
      brickLength: 20,
      brickWidth: 10,
      mortarGap: 1
    } as any;

    const result = await BrickPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
