
import { describe, it, expect } from 'vitest';
import { IGESExportNode } from './igesexport.node';
import { createTestContext } from '../test-utils';

describe('IGESExportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined,
      filePath: undefined
    } as any;
    const params = {
      units: "mm",
      precision: 0.01,
      writeMode: "brep"
    } as any;

    const result = await IGESExportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
