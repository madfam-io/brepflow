
import { describe, it, expect } from 'vitest';
import { ExportDXFNode } from './export-dxf.node';
import { createTestContext } from '../test-utils';

describe('ExportDXFNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined
    } as any;
    const params = {
      version: "R2010",
      projection: "top",
      hiddenLines: false
    } as any;

    const result = await ExportDXFNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
