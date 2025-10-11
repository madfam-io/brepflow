
import { describe, it, expect } from 'vitest';
import { ExportDXFNode } from './export-dxf.node';
import { createTestContext } from '../test-utils';

describe('ExportDXFNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      flatPattern: undefined
    } as any;
    const params = {
      inclueBendLines: true,
      includeFormingTools: true,
      layerMapping: "by-type"
    } as any;

    const result = await ExportDXFNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
