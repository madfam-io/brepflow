
import { describe, it, expect } from 'vitest';
import { UniversalJointNode } from './universal-joint.node';
import { createTestContext } from '../test-utils';

describe('UniversalJointNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      yokeDiameter: 30,
      crossPinDiameter: 8,
      length: 60,
      angle: 0
    } as any;

    const result = await UniversalJointNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
