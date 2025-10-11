
import { describe, it, expect } from 'vitest';
import { MicroJointsNode } from './micro-joints.node';
import { createTestContext } from '../test-utils';

describe('MicroJointsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      cutPath: undefined
    } as any;
    const params = {
      jointWidth: 0.2,
      jointSpacing: 30
    } as any;

    const result = await MicroJointsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
