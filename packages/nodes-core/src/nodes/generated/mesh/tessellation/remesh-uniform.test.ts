
import { describe, it, expect } from 'vitest';
import { RemeshUniformNode } from './remeshuniform-node';
import { createTestContext } from '../test-utils';

describe('RemeshUniformNode', () => {
  it('should create RemeshUniform', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */
    };
    const params = {
      targetEdgeLength: 1,
      iterations: 3,
      preserveFeatures: true
    };

    const result = await RemeshUniformNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.remeshed).toBeDefined();
  });

  
});