
import { describe, it, expect } from 'vitest';
import { TessellateNode } from './tessellate.node';
import { createTestContext } from '../test-utils';

describe('TessellateNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      linearDeflection: 0.1,
      angularDeflection: 0.5,
      relative: false,
      qualityNormals: true
    } as any;

    const result = await TessellateNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
