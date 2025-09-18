
import { describe, it, expect } from 'vitest';
import { ExportIGESNode } from './exportiges-node';
import { createTestContext } from '../test-utils';

describe('ExportIGESNode', () => {
  it('should create ExportIGES', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */
    };
    const params = {
      brepMode: "faces",
      units: "mm",
      author: ""
    };

    const result = await ExportIGESNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.igesData).toBeDefined();
  });

  
});