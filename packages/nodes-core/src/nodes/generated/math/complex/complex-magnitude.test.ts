
import { describe, it, expect } from 'vitest';
import { ComplexMagnitudeNode } from './complex-magnitude.node';
import { createTestContext } from '../test-utils';

describe('ComplexMagnitudeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      complex: undefined
    } as any;
    const params = {

    } as any;

    const result = await ComplexMagnitudeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
