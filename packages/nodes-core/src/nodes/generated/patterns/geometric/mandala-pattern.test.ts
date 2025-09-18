
import { describe, it, expect } from 'vitest';
import { MandalaPatternNode } from './mandalapattern-node';
import { createTestContext } from '../test-utils';

describe('MandalaPatternNode', () => {
  it('should create MandalaPattern', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      rings: 5,
      symmetry: 8,
      complexity: 3
    };

    const result = await MandalaPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mandala).toBeDefined();
  });

  
});