
import { describe, it, expect } from 'vitest';
import { CurveDerivativesNode } from './curve-derivatives.node';
import { createTestContext } from '../test-utils';

describe('CurveDerivativesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curve: undefined
    } as any;
    const params = {
      parameter: 0.5,
      order: 2,
      vectorScale: 1
    } as any;

    const result = await CurveDerivativesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
