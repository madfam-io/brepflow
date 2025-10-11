
import { describe, it, expect } from 'vitest';
import { IndentNode } from './indent.node';
import { createTestContext } from '../test-utils';

describe('IndentNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      targetBody: undefined,
      toolBody: undefined
    } as any;
    const params = {
      offset: 0.5,
      flipDirection: false
    } as any;

    const result = await IndentNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
