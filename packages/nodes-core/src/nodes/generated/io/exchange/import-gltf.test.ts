
import { describe, it, expect } from 'vitest';
import { ImportGLTFNode } from './import-gltf.node';
import { createTestContext } from '../test-utils';

describe('ImportGLTFNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      importAnimations: false,
      importMaterials: true
    } as any;

    const result = await ImportGLTFNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
