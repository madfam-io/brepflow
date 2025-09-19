
import { describe, it, expect } from 'vitest';
import { ProjectToPlaneNode } from './projecttoplane.node';
import { createTestContext } from './../test-utils';

describe('ProjectToPlaneNode', () => {
  it('should create ProjectToPlane', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      planeOriginX: 0,
      planeOriginY: 0,
      planeOriginZ: 0,
      planeNormalX: 0,
      planeNormalY: 0,
      planeNormalZ: 1
    };

    const result = await ProjectToPlaneNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.projected).toBeDefined();
  });

  
});