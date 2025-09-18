
import { describe, it, expect } from 'vitest';
import { IGESExportNode } from './igesexport-node';
import { createTestContext } from '../test-utils';

describe('IGESExportNode', () => {
  it('should create IGESExport', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null,
      filePath: null
    };
    const params = {
      units: "mm",
      precision: 0.01,
      writeMode: "brep"
    };

    const result = await IGESExportNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.entityCount).toBeDefined();
  });

  
});