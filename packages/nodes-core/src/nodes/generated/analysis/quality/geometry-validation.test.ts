
import { describe, it, expect } from 'vitest';
import { GeometryValidationNode } from './geometry-validation.node';
import { createTestContext } from '../test-utils';

describe('GeometryValidationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      checkClosed: true,
      checkValid: true
    } as any;

    const result = await GeometryValidationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
