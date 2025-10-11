
import { describe, it, expect } from 'vitest';
import { RemeshUniformNode } from './remesh-uniform.node';
import { createTestContext } from '../test-utils';

describe('RemeshUniformNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined
    } as any;
    const params = {
      targetEdgeLength: 1,
      iterations: 3,
      preserveFeatures: true
    } as any;

    const result = await RemeshUniformNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
