
import { describe, it, expect } from 'vitest';
import { MeshAttractorNode } from './meshattractor.node';
import { createTestContext } from './../../test-utils';

describe('MeshAttractorNode', () => {
  it('should create MeshAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: null
    };
    const params = {
      strength: 1,
      radius: 20,
      weightByArea: false
    };

    const result = await MeshAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});