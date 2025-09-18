
import { describe, it, expect } from 'vitest';
import { RandomChoiceNode } from './randomchoice-node';
import { createTestContext } from '../test-utils';

describe('RandomChoiceNode', () => {
  it('should create RandomChoice', async () => {
    const context = createTestContext();
    const inputs = {
      choices: /* test value */
    };
    const params = {
      seed: -1
    };

    const result = await RandomChoiceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.choice).toBeDefined();
  });

  
});