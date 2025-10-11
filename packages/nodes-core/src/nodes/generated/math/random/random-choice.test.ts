
import { describe, it, expect } from 'vitest';
import { RandomChoiceNode } from './random-choice.node';
import { createTestContext } from '../test-utils';

describe('RandomChoiceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      choices: undefined
    } as any;
    const params = {
      seed: -1
    } as any;

    const result = await RandomChoiceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
