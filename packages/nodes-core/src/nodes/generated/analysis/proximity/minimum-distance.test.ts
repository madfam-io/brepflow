
import { describe, it, expect } from 'vitest';
import { MinimumDistanceNode } from './minimum-distance.node';
import { createTestContext } from '../test-utils';

describe('MinimumDistanceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry1: undefined,
      geometry2: undefined
    } as any;
    const params = {
      tolerance: 0.01,
      showConnection: true
    } as any;

    const result = await MinimumDistanceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
