
import { describe, it, expect } from 'vitest';
import { FocusCompensationNode } from './focuscompensation-node';
import { createTestContext } from '../test-utils';

describe('FocusCompensationNode', () => {
  it('should create FocusCompensation', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */
    };
    const params = {
      focalLength: 50,
      beamDivergence: 2
    };

    const result = await FocusCompensationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.focusMap).toBeDefined();
  });

  
});