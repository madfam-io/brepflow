
import { describe, it, expect } from 'vitest';
import { JSONParserNode } from './jsonparser.node';
import { createTestContext } from '../test-utils';

describe('JSONParserNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      jsonData: undefined
    } as any;
    const params = {
      path: "",
      flatten: false
    } as any;

    const result = await JSONParserNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
