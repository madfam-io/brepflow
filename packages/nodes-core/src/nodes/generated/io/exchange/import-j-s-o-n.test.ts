
import { describe, it, expect } from 'vitest';
import { ImportJSONNode } from './importjson.node';
import { createTestContext } from './../../test-utils';

describe('ImportJSONNode', () => {
  it('should create ImportJSON', async () => {
    const context = createTestContext();
    const inputs = {
      jsonData: null
    };
    const params = {
      format: "brepflow"
    };

    const result = await ImportJSONNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shapes).toBeDefined();
    expect(result.metadata).toBeDefined();
  });

  
});