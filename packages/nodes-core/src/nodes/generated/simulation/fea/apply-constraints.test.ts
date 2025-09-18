
import { describe, it, expect } from 'vitest';
import { ApplyConstraintsNode } from './applyconstraints-node';
import { createTestContext } from '../test-utils';

describe('ApplyConstraintsNode', () => {
  it('should create ApplyConstraints', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */,
      constraintFaces: /* test value */
    };
    const params = {
      constraintType: "fixed",
      dof: [true,true,true,true,true,true]
    };

    const result = await ApplyConstraintsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.constrainedMesh).toBeDefined();
    expect(result.constraintData).toBeDefined();
  });

  
});