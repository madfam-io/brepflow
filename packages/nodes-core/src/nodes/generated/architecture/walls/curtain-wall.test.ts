
import { describe, it, expect } from 'vitest';
import { CurtainWallNode } from './curtainwall.node';
import { createTestContext } from './../../test-utils';

describe('CurtainWallNode', () => {
  it('should create CurtainWall', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      gridU: 1500,
      gridV: 1500,
      mullionWidth: 50,
      mullionDepth: 100
    };

    const result = await CurtainWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curtainWall).toBeDefined();
    expect(result.mullions).toBeDefined();
    expect(result.panels).toBeDefined();
  });

  
});