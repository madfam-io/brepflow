
import { describe, it, expect } from 'vitest';
import { MandalaPatternNode } from './mandala-pattern.node';
import { createTestContext } from '../test-utils';

describe('MandalaPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      rings: 5,
      symmetry: 8,
      complexity: 3
    } as any;

    const result = await MandalaPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
