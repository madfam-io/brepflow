
import { describe, it, expect } from 'vitest';
import { KeywayJointNode } from './keyway-joint.node';
import { createTestContext } from '../test-utils';

describe('KeywayJointNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shaftCenter: undefined
    } as any;
    const params = {
      shaftDiameter: 20,
      keyWidth: 6,
      keyHeight: 6,
      keyLength: 25
    } as any;

    const result = await KeywayJointNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
