
import { describe, it, expect } from 'vitest';
import { JointDefinitionNode } from './joint-definition.node';
import { createTestContext } from '../test-utils';

describe('JointDefinitionNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      body1: undefined,
      body2: undefined,
      jointLocation: undefined
    } as any;
    const params = {
      jointType: "revolute",
      axis: [0,0,1],
      minLimit: -180,
      maxLimit: 180
    } as any;

    const result = await JointDefinitionNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
