
import { describe, it, expect } from 'vitest';
import { STEPImportNode } from './stepimport-node';
import { createTestContext } from '../test-utils';

describe('STEPImportNode', () => {
  it('should create STEPImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      units: "auto",
      healGeometry: true,
      precision: 0.01,
      mergeSurfaces: false
    };

    const result = await STEPImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shapes).toBeDefined();
    expect(result.metadata).toBeDefined();
    expect(result.units).toBeDefined();
  });

  
});