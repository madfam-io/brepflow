
import { describe, it, expect } from 'vitest';
import { ImportOBJNode } from './import-obj.node';
import { createTestContext } from '../test-utils';

describe('ImportOBJNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: undefined
    } as any;
    const params = {
      importMaterials: true,
      importTextures: false
    } as any;

    const result = await ImportOBJNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
