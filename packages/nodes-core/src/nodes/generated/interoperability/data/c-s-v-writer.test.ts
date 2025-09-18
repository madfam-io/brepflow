
import { describe, it, expect } from 'vitest';
import { CSVWriterNode } from './csvwriter-node';
import { createTestContext } from '../test-utils';

describe('CSVWriterNode', () => {
  it('should create CSVWriter', async () => {
    const context = createTestContext();
    const inputs = {
      data: null,
      filePath: null
    };
    const params = {
      delimiter: ",",
      includeHeader: true,
      encoding: "utf-8"
    };

    const result = await CSVWriterNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.success).toBeDefined();
    expect(result.rowsWritten).toBeDefined();
  });

  
});