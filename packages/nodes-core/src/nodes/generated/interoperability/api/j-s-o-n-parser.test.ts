
import { describe, it, expect } from 'vitest';
import { JSONParserNode } from './jsonparser.node';
import { createTestContext } from './../../test-utils';

describe('JSONParserNode', () => {
  it('should create JSONParser', async () => {
    const context = createTestContext();
    const inputs = {
      jsonData: null
    };
    const params = {
      path: "",
      flatten: false
    };

    const result = await JSONParserNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.arrays).toBeDefined();
    expect(result.values).toBeDefined();
  });

  
});