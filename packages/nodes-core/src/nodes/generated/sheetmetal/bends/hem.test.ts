
import { describe, it, expect } from 'vitest';
import { HemNode } from './hem-node';
import { createTestContext } from '../test-utils';

describe('HemNode', () => {
  it('should create Hem', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: /* test value */,
      edge: /* test value */
    };
    const params = {
      hemType: "closed",
      hemLength: 10,
      hemGap: 0.5,
      hemRadius: 0.5
    };

    const result = await HemNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});