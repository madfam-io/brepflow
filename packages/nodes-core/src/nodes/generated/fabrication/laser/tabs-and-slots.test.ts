
import { describe, it, expect } from 'vitest';
import { TabsAndSlotsNode } from './tabsandslots.node';
import { createTestContext } from './../../test-utils';

describe('TabsAndSlotsNode', () => {
  it('should create TabsAndSlots', async () => {
    const context = createTestContext();
    const inputs = {
      edges: null
    };
    const params = {
      tabWidth: 10,
      tabDepth: 5,
      clearance: 0.1
    };

    const result = await TabsAndSlotsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.tabbedEdges).toBeDefined();
  });

  
});