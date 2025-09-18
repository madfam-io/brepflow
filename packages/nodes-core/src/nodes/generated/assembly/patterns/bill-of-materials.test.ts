
import { describe, it, expect } from 'vitest';
import { BillOfMaterialsNode } from './billofmaterials-node';
import { createTestContext } from '../test-utils';

describe('BillOfMaterialsNode', () => {
  it('should create BillOfMaterials', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: /* test value */
    };
    const params = {
      includeSubAssemblies: true,
      groupIdentical: true
    };

    const result = await BillOfMaterialsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bom).toBeDefined();
  });

  
});