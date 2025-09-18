
import { describe, it, expect } from 'vitest';
import { MaterialAssignNode } from './materialassign-node';
import { createTestContext } from '../test-utils';

describe('MaterialAssignNode', () => {
  it('should create MaterialAssign', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */
    };
    const params = {
      material: "steel",
      youngsModulus: 200000,
      poissonsRatio: 0.3,
      density: 7850,
      yieldStrength: 250
    };

    const result = await MaterialAssignNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.materializedMesh).toBeDefined();
    expect(result.materialData).toBeDefined();
  });

  
});