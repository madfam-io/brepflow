
import { describe, it, expect } from 'vitest';
import { ExcelWriterNode } from './excelwriter-node';
import { createTestContext } from '../test-utils';

describe('ExcelWriterNode', () => {
  it('should create ExcelWriter', async () => {
    const context = createTestContext();
    const inputs = {
      data: null,
      filePath: null
    };
    const params = {
      sheetName: "Sheet1",
      includeHeader: true,
      startCell: "A1"
    };

    const result = await ExcelWriterNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.cellsWritten).toBeDefined();
  });

  
});