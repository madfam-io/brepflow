
import { describe, it, expect } from 'vitest';
import { AlphaShapeNode } from './alphashape-node';
import { createTestContext } from '../test-utils';

describe('AlphaShapeNode', () => {
  it('should create AlphaShape', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      alpha: 1,
      mode: "3D"
    };

    const result = await AlphaShapeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
    expect(result.boundary).toBeDefined();
    expect(result.simplices).toBeDefined();
  });

  
});