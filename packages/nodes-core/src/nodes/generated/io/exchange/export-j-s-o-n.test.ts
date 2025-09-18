
import { describe, it, expect } from 'vitest';
import { ExportJSONNode } from './exportjson-node';
import { createTestContext } from '../test-utils';

describe('ExportJSONNode', () => {
  it('should create ExportJSON', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: /* test value */
    };
    const params = {
      format: "brepflow",
      precision: 6,
      includeTopology: true
    };

    const result = await ExportJSONNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.jsonData).toBeDefined();
  });

  
});