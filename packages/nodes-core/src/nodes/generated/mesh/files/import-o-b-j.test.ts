
import { describe, it, expect } from 'vitest';
import { ImportOBJNode } from './importobj-node';
import { createTestContext } from '../test-utils';

describe('ImportOBJNode', () => {
  it('should create ImportOBJ', async () => {
    const context = createTestContext();
    const inputs = {
      fileData: /* test value */
    };
    const params = {
      importMaterials: true,
      importTextures: false
    };

    const result = await ImportOBJNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.materials).toBeDefined();
  });

  
});