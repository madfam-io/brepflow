
import { describe, it, expect } from 'vitest';
import { ThreadInsertNode } from './threadinsert.node';
import { createTestContext } from './../../test-utils';

describe('ThreadInsertNode', () => {
  it('should create ThreadInsert', async () => {
    const context = createTestContext();
    const inputs = {
      position: null
    };
    const params = {
      threadSize: "M5",
      length: 10,
      type: "heat-set"
    };

    const result = await ThreadInsertNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.insert).toBeDefined();
    expect(result.installation_hole).toBeDefined();
  });

  
});