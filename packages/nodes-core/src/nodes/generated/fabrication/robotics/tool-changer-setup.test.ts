
import { describe, it, expect } from 'vitest';
import { ToolChangerSetupNode } from './toolchangersetup-node';
import { createTestContext } from '../test-utils';

describe('ToolChangerSetupNode', () => {
  it('should create ToolChangerSetup', async () => {
    const context = createTestContext();
    const inputs = {
      toolRack: null
    };
    const params = {
      toolCount: 6
    };

    const result = await ToolChangerSetupNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.toolChangeSequence).toBeDefined();
  });

  
});