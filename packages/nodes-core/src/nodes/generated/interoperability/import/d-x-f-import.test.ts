
import { describe, it, expect } from 'vitest';
import { DXFImportNode } from './dxfimport-node';
import { createTestContext } from '../test-utils';

describe('DXFImportNode', () => {
  it('should create DXFImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      units: "auto",
      layers: "all",
      explodeBlocks: false
    };

    const result = await DXFImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curves).toBeDefined();
    expect(result.points).toBeDefined();
    expect(result.texts).toBeDefined();
    expect(result.layers).toBeDefined();
  });

  
});