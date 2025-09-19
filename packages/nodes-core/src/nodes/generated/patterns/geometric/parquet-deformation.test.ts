
import { describe, it, expect } from 'vitest';
import { ParquetDeformationNode } from './parquetdeformation.node';
import { createTestContext } from './../../test-utils';

describe('ParquetDeformationNode', () => {
  it('should create ParquetDeformation', async () => {
    const context = createTestContext();
    const inputs = {
      baseTile: null
    };
    const params = {
      deformationType: "radial",
      steps: 10
    };

    const result = await ParquetDeformationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.deformation).toBeDefined();
  });

  
});