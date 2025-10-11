
import { describe, it, expect } from 'vitest';
import { CSVWriterNode } from './csvwriter.node';
import { createTestContext } from '../test-utils';

describe('CSVWriterNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      data: undefined,
      filePath: undefined
    } as any;
    const params = {
      delimiter: ",",
      includeHeader: true,
      encoding: "utf-8"
    } as any;

    const result = await CSVWriterNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
