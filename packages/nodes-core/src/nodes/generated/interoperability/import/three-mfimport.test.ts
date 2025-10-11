
import { describe, it, expect } from 'vitest';
import { ThreeMFImportNode } from './three-mfimport.node';
import { createTestContext } from '../test-utils';

describe('ThreeMFImportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      loadTextures: true,
      loadMaterials: true,
      units: "auto"
    } as any;

    const result = await ThreeMFImportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
