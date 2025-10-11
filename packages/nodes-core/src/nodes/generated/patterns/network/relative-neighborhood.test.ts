
import { describe, it, expect } from 'vitest';
import { RelativeNeighborhoodNode } from './relative-neighborhood.node';
import { createTestContext } from '../test-utils';

describe('RelativeNeighborhoodNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {

    } as any;

    const result = await RelativeNeighborhoodNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
