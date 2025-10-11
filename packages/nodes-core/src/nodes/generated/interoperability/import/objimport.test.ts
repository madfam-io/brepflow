
import { describe, it, expect } from 'vitest';
import { OBJImportNode } from './objimport.node';
import { createTestContext } from '../test-utils';

describe('OBJImportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      scale: 1,
      flipNormals: false,
      loadMaterials: true
    } as any;

    const result = await OBJImportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
