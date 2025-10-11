
import { describe, it, expect } from 'vitest';
import { ToolCompensationNode } from './tool-compensation.node';
import { createTestContext } from '../test-utils';

describe('ToolCompensationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined
    } as any;
    const params = {
      toolRadius: 3,
      wearOffset: 0
    } as any;

    const result = await ToolCompensationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
