
import { describe, it, expect } from 'vitest';
import { STLImportNode } from './stlimport.node';
import { createTestContext } from '../test-utils';

describe('STLImportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      mergeVertices: true,
      tolerance: 0.01,
      units: "mm"
    } as any;

    const result = await STLImportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
