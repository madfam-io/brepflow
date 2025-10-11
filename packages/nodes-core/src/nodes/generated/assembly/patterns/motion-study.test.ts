
import { describe, it, expect } from 'vitest';
import { MotionStudyNode } from './motion-study.node';
import { createTestContext } from '../test-utils';

describe('MotionStudyNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: undefined,
      drivers: undefined
    } as any;
    const params = {
      steps: 10,
      duration: 1
    } as any;

    const result = await MotionStudyNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
