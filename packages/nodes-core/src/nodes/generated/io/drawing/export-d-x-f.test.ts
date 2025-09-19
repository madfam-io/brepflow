
import { describe, it, expect } from 'vitest';
import { ExportDXFNode } from './exportdxf.node';
import { createTestContext } from './../../test-utils';

describe('ExportDXFNode', () => {
  it('should create ExportDXF', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null
    };
    const params = {
      version: "R2010",
      projection: "top",
      hiddenLines: false
    };

    const result = await ExportDXFNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.dxfData).toBeDefined();
  });

  
});