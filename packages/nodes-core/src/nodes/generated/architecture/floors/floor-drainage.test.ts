
import { describe, it, expect } from 'vitest';
import { FloorDrainageNode } from './floordrainage.node';
import { createTestContext } from './../../test-utils';

describe('FloorDrainageNode', () => {
  it('should create FloorDrainage', async () => {
    const context = createTestContext();
    const inputs = {
      floorBoundary: null,
      drainLocations: null
    };
    const params = {
      slope: 0.01,
      drainType: "point"
    };

    const result = await FloorDrainageNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.slopedFloor).toBeDefined();
    expect(result.drains).toBeDefined();
  });

  
});