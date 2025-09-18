
import { describe, it, expect } from 'vitest';
import { ExportSTLNode } from './exportstl-node';
import { createTestContext } from '../test-utils';

describe('ExportSTLNode', () => {
  it('should create ExportSTL', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */
    };
    const params = {
      format: "binary",
      units: "mm"
    };

    const result = await ExportSTLNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.stlData).toBeDefined();
  });

  
});