
import { describe, it, expect } from 'vitest';
import { StepDraftNode } from './step-draft.node';
import { createTestContext } from '../test-utils';

describe('StepDraftNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      solid: undefined,
      draftData: undefined
    } as any;
    const params = {
      steps: 2
    } as any;

    const result = await StepDraftNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
