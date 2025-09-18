
import { describe, it, expect } from 'vitest';
import { MicroJointsNode } from './microjoints-node';
import { createTestContext } from '../test-utils';

describe('MicroJointsNode', () => {
  it('should create MicroJoints', async () => {
    const context = createTestContext();
    const inputs = {
      cutPath: /* test value */
    };
    const params = {
      jointWidth: 0.2,
      jointSpacing: 30
    };

    const result = await MicroJointsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.jointedPath).toBeDefined();
  });

  
});