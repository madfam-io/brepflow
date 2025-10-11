
import { describe, it, expect } from 'vitest';
import { OBJExportNode } from './objexport.node';
import { createTestContext } from '../test-utils';

describe('OBJExportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      meshes: undefined,
      filePath: undefined
    } as any;
    const params = {
      includeNormals: true,
      includeTexCoords: false,
      smoothing: true
    } as any;

    const result = await OBJExportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
