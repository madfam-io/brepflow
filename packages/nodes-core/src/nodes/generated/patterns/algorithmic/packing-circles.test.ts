
import { describe, it, expect } from 'vitest';
import { PackingCirclesNode } from './packing-circles.node';
import { createTestContext } from '../test-utils';

describe('PackingCirclesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined,
      radii: undefined
    } as any;
    const params = {
      algorithm: "power-diagram"
    } as any;

    const result = await PackingCirclesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
