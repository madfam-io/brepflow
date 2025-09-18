
import { describe, it, expect } from 'vitest';
import { FloorExpansionJointNode } from './floorexpansionjoint-node';
import { createTestContext } from '../test-utils';

describe('FloorExpansionJointNode', () => {
  it('should create FloorExpansionJoint', async () => {
    const context = createTestContext();
    const inputs = {
      jointPath: /* test value */
    };
    const params = {
      jointWidth: 25,
      sealantDepth: 10
    };

    const result = await FloorExpansionJointNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.expansionJoint).toBeDefined();
  });

  
});