
import { describe, it, expect } from 'vitest';
import { MirrorNode } from './mirror-node';
import { createTestContext } from '../test-utils';

describe('MirrorNode', () => {
  it('should create Mirror', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      planeOriginX: 0,
      planeOriginY: 0,
      planeOriginZ: 0,
      planeNormalX: 1,
      planeNormalY: 0,
      planeNormalZ: 0,
      copy: true
    };

    const result = await MirrorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mirrored).toBeDefined();
  });

  
});