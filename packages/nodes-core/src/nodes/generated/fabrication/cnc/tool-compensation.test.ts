
import { describe, it, expect } from 'vitest';
import { ToolCompensationNode } from './toolcompensation-node';
import { createTestContext } from '../test-utils';

describe('ToolCompensationNode', () => {
  it('should create ToolCompensation', async () => {
    const context = createTestContext();
    const inputs = {
      path: null
    };
    const params = {
      toolRadius: 3,
      wearOffset: 0
    };

    const result = await ToolCompensationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.compensatedPath).toBeDefined();
  });

  
});