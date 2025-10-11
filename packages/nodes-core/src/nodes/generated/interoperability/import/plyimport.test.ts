
import { describe, it, expect } from 'vitest';
import { PLYImportNode } from './plyimport.node';
import { createTestContext } from '../test-utils';

describe('PLYImportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      loadColors: true,
      loadNormals: true,
      scaleFactor: 1
    } as any;

    const result = await PLYImportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
