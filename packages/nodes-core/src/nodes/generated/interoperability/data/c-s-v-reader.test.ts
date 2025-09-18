
import { describe, it, expect } from 'vitest';
import { CSVReaderNode } from './csvreader-node';
import { createTestContext } from '../test-utils';

describe('CSVReaderNode', () => {
  it('should create CSVReader', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: /* test value */
    };
    const params = {
      delimiter: ",",
      hasHeader: true,
      encoding: "utf-8"
    };

    const result = await CSVReaderNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.headers).toBeDefined();
    expect(result.rowCount).toBeDefined();
  });

  
});