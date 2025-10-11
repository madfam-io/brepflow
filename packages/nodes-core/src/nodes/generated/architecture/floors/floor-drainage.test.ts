
import { describe, it, expect } from 'vitest';
import { FloorDrainageNode } from './floor-drainage.node';
import { createTestContext } from '../test-utils';

describe('FloorDrainageNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      floorBoundary: undefined,
      drainLocations: undefined
    } as any;
    const params = {
      slope: 0.01,
      drainType: "point"
    } as any;

    const result = await FloorDrainageNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
