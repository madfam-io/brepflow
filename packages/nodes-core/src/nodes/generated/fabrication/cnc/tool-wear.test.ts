
import { describe, it, expect } from 'vitest';
import { ToolWearNode } from './toolwear.node';
import { createTestContext } from './../../test-utils';

describe('ToolWearNode', () => {
  it('should create ToolWear', async () => {
    const context = createTestContext();
    const inputs = {
      toolpath: null
    };
    const params = {
      material: "steel",
      cuttingTime: 60
    };

    const result = await ToolWearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.wearRate).toBeDefined();
    expect(result.toolLife).toBeDefined();
  });

  
});