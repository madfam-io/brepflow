
import { describe, it, expect } from 'vitest';
import { ToJSONNode } from './tojson.node';
import { createTestContext } from './../../test-utils';

describe('ToJSONNode', () => {
  it('should create ToJSON', async () => {
    const context = createTestContext();
    const inputs = {
      data: null
    };
    const params = {
      pretty: false
    };

    const result = await ToJSONNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.json).toBeDefined();
  });

  
});