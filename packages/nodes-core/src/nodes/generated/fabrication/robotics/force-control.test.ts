
import { describe, it, expect } from 'vitest';
import { ForceControlNode } from './force-control.node';
import { createTestContext } from '../test-utils';

describe('ForceControlNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      contactSurface: undefined
    } as any;
    const params = {
      forceLimit: 100,
      compliance: 0.5
    } as any;

    const result = await ForceControlNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
