
import { describe, it, expect } from 'vitest';
import { TabsAndSlotsNode } from './tabs-and-slots.node';
import { createTestContext } from '../test-utils';

describe('TabsAndSlotsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      edges: undefined
    } as any;
    const params = {
      tabWidth: 10,
      tabDepth: 5,
      clearance: 0.1
    } as any;

    const result = await TabsAndSlotsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
