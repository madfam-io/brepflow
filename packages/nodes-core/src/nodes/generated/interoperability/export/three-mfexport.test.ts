
import { describe, it, expect } from 'vitest';
import { ThreeMFExportNode } from './three-mfexport.node';
import { createTestContext } from '../test-utils';

describe('ThreeMFExportNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      models: undefined,
      filePath: undefined
    } as any;
    const params = {
      units: "mm",
      includeColors: true,
      compression: true
    } as any;

    const result = await ThreeMFExportNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
