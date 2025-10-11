
import { describe, it, expect } from 'vitest';
import { ProjectToPlaneNode } from './project-to-plane.node';
import { createTestContext } from '../test-utils';

describe('ProjectToPlaneNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      planeOriginX: 0,
      planeOriginY: 0,
      planeOriginZ: 0,
      planeNormalX: 0,
      planeNormalY: 0,
      planeNormalZ: 1
    } as any;

    const result = await ProjectToPlaneNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
