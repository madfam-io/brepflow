
import { describe, it, expect } from 'vitest';
import { SmartFastenersNode } from './smart-fasteners.node';
import { createTestContext } from '../test-utils';

describe('SmartFastenersNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      holes: undefined
    } as any;
    const params = {
      type: "bolt",
      size: 10,
      autoSize: true
    } as any;

    const result = await SmartFastenersNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
