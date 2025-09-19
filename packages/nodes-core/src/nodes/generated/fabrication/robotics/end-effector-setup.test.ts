
import { describe, it, expect } from 'vitest';
import { EndEffectorSetupNode } from './endeffectorsetup.node';
import { createTestContext } from './../../test-utils';

describe('EndEffectorSetupNode', () => {
  it('should create EndEffectorSetup', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      toolType: "gripper",
      tcpOffset: "[0, 0, 100]"
    };

    const result = await EndEffectorSetupNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.toolConfiguration).toBeDefined();
  });

  
});