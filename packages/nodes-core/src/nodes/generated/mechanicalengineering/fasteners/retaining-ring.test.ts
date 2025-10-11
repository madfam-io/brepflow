
import { describe, it, expect } from 'vitest';
import { RetainingRingNode } from './retaining-ring.node';
import { createTestContext } from '../test-utils';

describe('RetainingRingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      shaftDiameter: 10,
      type: "external",
      thickness: 1,
      grooveWidth: 1.2
    } as any;

    const result = await RetainingRingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
