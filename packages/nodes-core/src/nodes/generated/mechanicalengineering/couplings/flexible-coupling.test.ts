
import { describe, it, expect } from 'vitest';
import { FlexibleCouplingNode } from './flexiblecoupling-node';
import { createTestContext } from '../test-utils';

describe('FlexibleCouplingNode', () => {
  it('should create FlexibleCoupling', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      type: "jaw",
      boreDiameter1: 10,
      boreDiameter2: 10,
      outerDiameter: 30
    };

    const result = await FlexibleCouplingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.coupling).toBeDefined();
    expect(result.element).toBeDefined();
  });

  
});