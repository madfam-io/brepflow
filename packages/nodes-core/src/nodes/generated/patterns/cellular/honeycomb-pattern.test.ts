
import { describe, it, expect } from 'vitest';
import { HoneycombPatternNode } from './honeycomb-pattern.node';
import { createTestContext } from '../test-utils';

describe('HoneycombPatternNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      cellSize: 10,
      wallThickness: 1
    } as any;

    const result = await HoneycombPatternNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
