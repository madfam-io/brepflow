
import { describe, it, expect } from 'vitest';
import { BeadNode } from './bead.node';
import { createTestContext } from '../test-utils';

describe('BeadNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined,
      path: undefined
    } as any;
    const params = {
      beadWidth: 10,
      beadHeight: 3,
      beadProfile: "U"
    } as any;

    const result = await BeadNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
