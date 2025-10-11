
import { describe, it, expect } from 'vitest';
import { ExportSTLNode } from './export-stl.node';
import { createTestContext } from '../test-utils';

describe('ExportSTLNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined
    } as any;
    const params = {
      format: "binary",
      units: "mm"
    } as any;

    const result = await ExportSTLNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
