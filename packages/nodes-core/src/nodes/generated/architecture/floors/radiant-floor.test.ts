
import { describe, it, expect } from 'vitest';
import { RadiantFloorNode } from './radiantfloor.node';
import { createTestContext } from './../../test-utils';

describe('RadiantFloorNode', () => {
  it('should create RadiantFloor', async () => {
    const context = createTestContext();
    const inputs = {
      floorArea: null
    };
    const params = {
      pipeSpacing: 200,
      pipeDialeter: 16,
      zoneCount: 1
    };

    const result = await RadiantFloorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.radiantLayout).toBeDefined();
    expect(result.manifold).toBeDefined();
  });

  
});