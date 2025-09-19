
import { describe, it, expect } from 'vitest';
import { HealShapeNode } from './healshape.node';
import { createTestContext } from './../../test-utils';

describe('HealShapeNode', () => {
  it('should create HealShape', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      tolerance: 0.01,
      fixSmallEdges: true,
      fixSmallFaces: true,
      sewFaces: true,
      makeManifold: false
    };

    const result = await HealShapeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.healed).toBeDefined();
    expect(result.report).toBeDefined();
  });

  
});