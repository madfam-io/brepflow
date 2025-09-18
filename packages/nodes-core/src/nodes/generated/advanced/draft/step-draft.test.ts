
import { describe, it, expect } from 'vitest';
import { StepDraftNode } from './stepdraft-node';
import { createTestContext } from '../test-utils';

describe('StepDraftNode', () => {
  it('should create StepDraft', async () => {
    const context = createTestContext();
    const inputs = {
      solid: /* test value */,
      draftData: /* test value */
    };
    const params = {
      steps: 2
    };

    const result = await StepDraftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.drafted).toBeDefined();
  });

  
});