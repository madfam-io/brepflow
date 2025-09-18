
import { describe, it, expect } from 'vitest';
import { TessellateNode } from './tessellate-node';
import { createTestContext } from '../test-utils';

describe('TessellateNode', () => {
  it('should create Tessellate', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */
    };
    const params = {
      linearDeflection: 0.1,
      angularDeflection: 0.5,
      relative: false,
      qualityNormals: true
    };

    const result = await TessellateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mesh).toBeDefined();
    expect(result.triangleCount).toBeDefined();
    expect(result.vertexCount).toBeDefined();
  });

  
});