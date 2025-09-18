
import { describe, it, expect } from 'vitest';
import { GradedLatticeNode } from './gradedlattice-node';
import { createTestContext } from '../test-utils';

describe('GradedLatticeNode', () => {
  it('should create GradedLattice', async () => {
    const context = createTestContext();
    const inputs = {
      boundingShape: /* test value */
    };
    const params = {
      minDensity: 0.2,
      maxDensity: 0.8,
      gradientType: "linear"
    };

    const result = await GradedLatticeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gradedLattice).toBeDefined();
  });

  
});