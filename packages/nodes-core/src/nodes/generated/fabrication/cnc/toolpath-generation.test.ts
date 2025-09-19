
import { describe, it, expect } from 'vitest';
import { ToolpathGenerationNode } from './toolpathgeneration.node';
import { createTestContext } from './../../test-utils';

describe('ToolpathGenerationNode', () => {
  it('should create ToolpathGeneration', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      strategy: "parallel",
      toolDiameter: 6,
      stepover: 0.5
    };

    const result = await ToolpathGenerationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.toolpath).toBeDefined();
    expect(result.rapids).toBeDefined();
  });

  
});