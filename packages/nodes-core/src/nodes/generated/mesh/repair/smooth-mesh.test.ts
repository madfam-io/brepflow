
import { describe, it, expect } from 'vitest';
import { SmoothMeshNode } from './smooth-mesh.node';
import { createTestContext } from '../test-utils';

describe('SmoothMeshNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined
    } as any;
    const params = {
      iterations: 5,
      smoothingFactor: 0.5,
      preserveVolume: true
    } as any;

    const result = await SmoothMeshNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
