
import { describe, it, expect } from 'vitest';
import { InterferenceCheckNode } from './interferencecheck-node';
import { createTestContext } from '../test-utils';

describe('InterferenceCheckNode', () => {
  it('should create InterferenceCheck', async () => {
    const context = createTestContext();
    const inputs = {
      assembly: /* test value */
    };
    const params = {
      clearance: 0
    };

    const result = await InterferenceCheckNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.interferences).toBeDefined();
    expect(result.hasInterference).toBeDefined();
  });

  
});