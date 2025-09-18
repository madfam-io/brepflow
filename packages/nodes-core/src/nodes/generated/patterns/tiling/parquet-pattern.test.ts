
import { describe, it, expect } from 'vitest';
import { ParquetPatternNode } from './parquetpattern-node';
import { createTestContext } from '../test-utils';

describe('ParquetPatternNode', () => {
  it('should create ParquetPattern', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */
    };
    const params = {
      pattern: "herringbone",
      plankLength: 30,
      plankWidth: 5
    };

    const result = await ParquetPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.planks).toBeDefined();
  });

  
});