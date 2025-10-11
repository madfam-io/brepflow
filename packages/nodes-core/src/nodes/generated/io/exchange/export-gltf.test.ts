
import { describe, it, expect } from 'vitest';
import { ExportGLTFNode } from './export-gltf.node';
import { createTestContext } from '../test-utils';

describe('ExportGLTFNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      format: "glb",
      draco: false
    } as any;

    const result = await ExportGLTFNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
