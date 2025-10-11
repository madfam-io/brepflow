
import { describe, it, expect } from 'vitest';
import { IGESImportNode } from './igesimport.node';
import { createTestContext } from '../test-utils';

describe('IGESImportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      filePath: undefined
    } as any;
    const params = {
      units: "auto",
      readFailed: false,
      oneObject: false
    } as any;

    const result = await IGESImportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
