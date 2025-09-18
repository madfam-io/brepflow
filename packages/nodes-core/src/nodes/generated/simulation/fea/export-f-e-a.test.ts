
import { describe, it, expect } from 'vitest';
import { ExportFEANode } from './exportfea-node';
import { createTestContext } from '../test-utils';

describe('ExportFEANode', () => {
  it('should create ExportFEA', async () => {
    const context = createTestContext();
    const inputs = {
      feaModel: null
    };
    const params = {
      format: "nastran",
      includeLoads: true,
      includeConstraints: true,
      includeMaterials: true
    };

    const result = await ExportFEANode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.feaFile).toBeDefined();
  });

  
});