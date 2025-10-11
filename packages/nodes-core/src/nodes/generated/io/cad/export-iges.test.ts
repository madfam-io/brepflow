
import { describe, it, expect } from 'vitest';
import { ExportIGESNode } from './export-iges.node';
import { createTestContext } from '../test-utils';

describe('ExportIGESNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shape: undefined
    } as any;
    const params = {
      brepMode: "faces",
      units: "mm",
      author: ""
    } as any;

    const result = await ExportIGESNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
