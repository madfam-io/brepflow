
import { describe, it, expect } from 'vitest';
import { PostProcessorNode } from './post-processor.node';
import { createTestContext } from '../test-utils';

describe('PostProcessorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      toolpaths: undefined
    } as any;
    const params = {
      machine: "haas",
      axes: "3-axis"
    } as any;

    const result = await PostProcessorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
