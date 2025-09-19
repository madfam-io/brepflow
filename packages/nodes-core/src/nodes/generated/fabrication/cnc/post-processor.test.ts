
import { describe, it, expect } from 'vitest';
import { PostProcessorNode } from './postprocessor.node';
import { createTestContext } from './../../test-utils';

describe('PostProcessorNode', () => {
  it('should create PostProcessor', async () => {
    const context = createTestContext();
    const inputs = {
      toolpaths: null
    };
    const params = {
      machine: "haas",
      axes: "3-axis"
    };

    const result = await PostProcessorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.ncCode).toBeDefined();
  });

  
});