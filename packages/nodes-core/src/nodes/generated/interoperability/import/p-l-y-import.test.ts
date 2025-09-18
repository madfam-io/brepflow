
import { describe, it, expect } from 'vitest';
import { PLYImportNode } from './plyimport-node';
import { createTestContext } from '../test-utils';

describe('PLYImportNode', () => {
  it('should create PLYImport', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: /* test value */
    };
    const params = {
      loadColors: true,
      loadNormals: true,
      scaleFactor: 1
    };

    const result = await PLYImportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.points).toBeDefined();
    expect(result.colors).toBeDefined();
    expect(result.normals).toBeDefined();
  });

  
});