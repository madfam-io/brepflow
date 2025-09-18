
import { describe, it, expect } from 'vitest';
import { IndentNode } from './indent-node';
import { createTestContext } from '../test-utils';

describe('IndentNode', () => {
  it('should create Indent', async () => {
    const context = createTestContext();
    const inputs = {
      targetBody: /* test value */,
      toolBody: /* test value */
    };
    const params = {
      offset: 0.5,
      flipDirection: false
    };

    const result = await IndentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.indented).toBeDefined();
  });

  
});