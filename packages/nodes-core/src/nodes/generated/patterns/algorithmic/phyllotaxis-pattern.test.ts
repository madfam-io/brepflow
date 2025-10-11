
import { describe, it, expect } from 'vitest';
import { PhyllotaxisPatternNode } from './phyllotaxis-pattern.node';
import { createTestContext } from '../test-utils';

describe('PhyllotaxisPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      count: 100,
      angle: 137.5,
      c: 1
    } as any;

    const result = await PhyllotaxisPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
