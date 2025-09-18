
import { describe, it, expect } from 'vitest';
import { ChargeFieldNode } from './chargefield-node';
import { createTestContext } from '../test-utils';

describe('ChargeFieldNode', () => {
  it('should create ChargeField', async () => {
    const context = createTestContext();
    const inputs = {
      points: /* test value */
    };
    const params = {
      charge: 1,
      falloff: "inverse-square"
    };

    const result = await ChargeFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});