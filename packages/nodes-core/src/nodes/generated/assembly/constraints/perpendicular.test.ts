
import { describe, it, expect } from 'vitest';
import { PerpendicularNode } from './perpendicular-node';
import { createTestContext } from '../test-utils';

describe('PerpendicularNode', () => {
  it('should create Perpendicular', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: /* test value */,
      entity2: /* test value */
    };
    const params = {
      
    };

    const result = await PerpendicularNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.constrained).toBeDefined();
    expect(result.constraint).toBeDefined();
  });

  
});