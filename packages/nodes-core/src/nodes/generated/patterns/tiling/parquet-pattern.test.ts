
import { describe, it, expect } from 'vitest';
import { ParquetPatternNode } from './parquet-pattern.node';
import { createTestContext } from '../test-utils';

describe('ParquetPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      pattern: "herringbone",
      plankLength: 30,
      plankWidth: 5
    } as any;

    const result = await ParquetPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
