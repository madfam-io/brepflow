
import { describe, it, expect } from 'vitest';
import { CSVReaderNode } from './csvreader.node';
import { createTestContext } from '../test-utils';

describe('CSVReaderNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      delimiter: ",",
      hasHeader: true,
      encoding: "utf-8"
    } as any;

    const result = await CSVReaderNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
