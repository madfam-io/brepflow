
import { describe, it, expect } from 'vitest';
import { STEPImportNode } from './stepimport.node';
import { createTestContext } from '../test-utils';

describe('STEPImportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      units: "auto",
      healGeometry: true,
      precision: 0.01,
      mergeSurfaces: false
    } as any;

    const result = await STEPImportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
