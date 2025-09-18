
import { describe, it, expect } from 'vitest';
import { JointDefinitionNode } from './jointdefinition-node';
import { createTestContext } from '../test-utils';

describe('JointDefinitionNode', () => {
  it('should create JointDefinition', async () => {
    const context = createTestContext();
    const inputs = {
      body1: /* test value */,
      body2: /* test value */,
      jointLocation: /* test value */
    };
    const params = {
      jointType: "revolute",
      axis: [0,0,1],
      minLimit: -180,
      maxLimit: 180
    };

    const result = await JointDefinitionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
    expect(result.assembly).toBeDefined();
  });

  
});