
import { describe, it, expect } from 'vitest';
import { BrimGenerationNode } from './brim-generation.node';
import { createTestContext } from '../test-utils';

describe('BrimGenerationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      brimWidth: 10,
      brimLines: 20
    } as any;

    const result = await BrimGenerationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
