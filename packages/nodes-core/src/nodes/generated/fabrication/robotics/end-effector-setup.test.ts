
import { describe, it, expect } from 'vitest';
import { EndEffectorSetupNode } from './end-effector-setup.node';
import { createTestContext } from '../test-utils';

describe('EndEffectorSetupNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      toolType: "gripper",
      tcpOffset: "[0, 0, 100]"
    } as any;

    const result = await EndEffectorSetupNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
