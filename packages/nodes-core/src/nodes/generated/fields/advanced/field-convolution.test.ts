
import { describe, it, expect } from 'vitest';
import { FieldConvolutionNode } from './field-convolution.node';
import { createTestContext } from '../test-utils';

describe('FieldConvolutionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      kernel: undefined
    } as any;
    const params = {
      kernelSize: 3
    } as any;

    const result = await FieldConvolutionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
