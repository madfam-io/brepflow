
import { describe, it, expect } from 'vitest';
import { FoundationWallNode } from './foundationwall.node';
import { createTestContext } from './../../test-utils';

describe('FoundationWallNode', () => {
  it('should create FoundationWall', async () => {
    const context = createTestContext();
    const inputs = {
      foundationLine: null
    };
    const params = {
      depth: 1500,
      footingWidth: 600
    };

    const result = await FoundationWallNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.foundationWall).toBeDefined();
    expect(result.footing).toBeDefined();
  });

  
});