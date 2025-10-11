
import { describe, it, expect } from 'vitest';
import { SurfaceDerivativesNode } from './surface-derivatives.node';
import { createTestContext } from '../test-utils';

describe('SurfaceDerivativesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      surface: undefined
    } as any;
    const params = {
      u: 0.5,
      v: 0.5,
      order: 2,
      vectorScale: 1
    } as any;

    const result = await SurfaceDerivativesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
