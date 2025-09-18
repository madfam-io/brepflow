
import { describe, it, expect } from 'vitest';
import { ExportOBJNode } from './exportobj-node';
import { createTestContext } from '../test-utils';

describe('ExportOBJNode', () => {
  it('should create ExportOBJ', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */
    };
    const params = {
      exportNormals: true,
      exportUVs: false
    };

    const result = await ExportOBJNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.objData).toBeDefined();
    expect(result.mtlData).toBeDefined();
  });

  
});