
import { describe, it, expect } from 'vitest';
import { FaceToFaceNode } from './facetoface-node';
import { createTestContext } from '../test-utils';

describe('FaceToFaceNode', () => {
  it('should create FaceToFace', async () => {
    const context = createTestContext();
    const inputs = {
      face1: /* test value */,
      face2: /* test value */
    };
    const params = {
      offset: 0,
      flip: false
    };

    const result = await FaceToFaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mated).toBeDefined();
    expect(result.mate).toBeDefined();
  });

  
});