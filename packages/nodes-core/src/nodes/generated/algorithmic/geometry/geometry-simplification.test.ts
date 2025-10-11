
import { describe, it, expect } from 'vitest';
import { GeometrySimplificationNode } from './geometry-simplification.node';
import { createTestContext } from '../test-utils';

describe('GeometrySimplificationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: undefined
    } as any;
    const params = {
      algorithm: "quadric",
      reduction: 0.5,
      preserveBoundary: true
    } as any;

    const result = await GeometrySimplificationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
