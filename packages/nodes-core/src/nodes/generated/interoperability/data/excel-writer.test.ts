
import { describe, it, expect } from 'vitest';
import { ExcelWriterNode } from './excel-writer.node';
import { createTestContext } from '../test-utils';

describe('ExcelWriterNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined,
      filePath: undefined
    } as any;
    const params = {
      sheetName: "Sheet1",
      includeHeader: true,
      startCell: "A1"
    } as any;

    const result = await ExcelWriterNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
