
import { describe, it, expect } from 'vitest';
import { ExcelReaderNode } from './excelreader.node';
import { createTestContext } from './../../test-utils';

describe('ExcelReaderNode', () => {
  it('should create ExcelReader', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: null
    };
    const params = {
      sheetName: "",
      hasHeader: true,
      range: ""
    };

    const result = await ExcelReaderNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.sheetNames).toBeDefined();
    expect(result.dimensions).toBeDefined();
  });

  
});