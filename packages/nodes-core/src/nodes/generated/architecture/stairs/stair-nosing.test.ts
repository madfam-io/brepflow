
import { describe, it, expect } from 'vitest';
import { StairNosingNode } from './stair-nosing.node';
import { createTestContext } from '../test-utils';

describe('StairNosingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      treadEdges: undefined
    } as any;
    const params = {
      projection: 25,
      material: "aluminum"
    } as any;

    const result = await StairNosingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
