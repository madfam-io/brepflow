
import { describe, it, expect } from 'vitest';
import { STEPExportNode } from './stepexport.node';
import { createTestContext } from '../test-utils';

describe('STEPExportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined,
      filePath: undefined
    } as any;
    const params = {
      version: "AP214",
      units: "mm",
      precision: 0.01,
      writeMode: "manifold"
    } as any;

    const result = await STEPExportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
