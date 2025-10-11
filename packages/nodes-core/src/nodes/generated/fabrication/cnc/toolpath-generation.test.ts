
import { describe, it, expect } from 'vitest';
import { ToolpathGenerationNode } from './toolpath-generation.node';
import { createTestContext } from '../test-utils';

describe('ToolpathGenerationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      strategy: "parallel",
      toolDiameter: 6,
      stepover: 0.5
    } as any;

    const result = await ToolpathGenerationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
