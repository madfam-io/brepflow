
import { describe, it, expect } from 'vitest';
import { DXFImportNode } from './dxfimport.node';
import { createTestContext } from '../test-utils';

describe('DXFImportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      units: "auto",
      layers: "all",
      explodeBlocks: false
    } as any;

    const result = await DXFImportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
