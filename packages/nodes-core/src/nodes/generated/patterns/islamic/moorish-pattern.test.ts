
import { describe, it, expect } from 'vitest';
import { MoorishPatternNode } from './moorish-pattern.node';
import { createTestContext } from '../test-utils';

describe('MoorishPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      region: undefined
    } as any;
    const params = {
      style: "alhambra",
      scale: 10
    } as any;

    const result = await MoorishPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
