
import { describe, it, expect } from 'vitest';
import { ExportJSONNode } from './export-json.node';
import { createTestContext } from '../test-utils';

describe('ExportJSONNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined
    } as any;
    const params = {
      format: "brepflow",
      precision: 6,
      includeTopology: true
    } as any;

    const result = await ExportJSONNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
