
import { describe, it, expect } from 'vitest';
import { MotionStudyNode } from './motionstudy.node';
import { createTestContext } from './../../test-utils';

describe('MotionStudyNode', () => {
  it('should create MotionStudy', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: null,
      drivers: null
    };
    const params = {
      steps: 10,
      duration: 1
    };

    const result = await MotionStudyNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.frames).toBeDefined();
    expect(result.collisions).toBeDefined();
  });

  
});