
import { describe, it, expect } from 'vitest';
import { GeometryMatchingNode } from './geometry-matching.node';
import { createTestContext } from '../test-utils';

describe('GeometryMatchingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      source: undefined,
      target: undefined
    } as any;
    const params = {
      algorithm: "icp",
      tolerance: 0.01,
      iterations: 50
    } as any;

    const result = await GeometryMatchingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
