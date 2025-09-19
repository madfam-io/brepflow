
import { describe, it, expect } from 'vitest';
import { FieldConvolutionNode } from './fieldconvolution.node';
import { createTestContext } from './../../test-utils';

describe('FieldConvolutionNode', () => {
  it('should create FieldConvolution', async () => {
    const context = createTestContext();
    const inputs = {
      kernel: null
    };
    const params = {
      kernelSize: 3
    };

    const result = await FieldConvolutionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.convolvedField).toBeDefined();
  });

  
});