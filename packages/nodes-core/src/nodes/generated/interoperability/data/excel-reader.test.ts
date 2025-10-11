
import { describe, it, expect } from 'vitest';
import { ExcelReaderNode } from './excel-reader.node';
import { createTestContext } from '../test-utils';

describe('ExcelReaderNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      sheetName: "",
      hasHeader: true,
      range: ""
    } as any;

    const result = await ExcelReaderNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
