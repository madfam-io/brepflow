
import { describe, it, expect } from 'vitest';
import { WoodJoistFloorNode } from './woodjoistfloor-node';
import { createTestContext } from '../test-utils';

describe('WoodJoistFloorNode', () => {
  it('should create WoodJoistFloor', async () => {
    const context = createTestContext();
    const inputs = {
      floorBoundary: /* test value */
    };
    const params = {
      joistDepth: 250,
      joistSpacing: 400,
      subfloorThickness: 18
    };

    const result = await WoodJoistFloorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.floorSystem).toBeDefined();
    expect(result.joists).toBeDefined();
  });

  
});