
import { describe, it, expect } from 'vitest';
import { LoadingDockNode } from './loadingdock.node';
import { createTestContext } from './../../test-utils';

describe('LoadingDockNode', () => {
  it('should create LoadingDock', async () => {
    const context = createTestContext();
    const inputs = {
      dockPosition: null
    };
    const params = {
      dockHeight: 1200,
      levellerType: "hydraulic"
    };

    const result = await LoadingDockNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.dockRamp).toBeDefined();
    expect(result.leveller).toBeDefined();
  });

  
});