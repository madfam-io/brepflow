
import { describe, it, expect } from 'vitest';
import { BowWindowNode } from './bow-window.node';
import { createTestContext } from '../test-utils';

describe('BowWindowNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      wallOpening: undefined
    } as any;
    const params = {
      projection: 600,
      segments: 5
    } as any;

    const result = await BowWindowNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
