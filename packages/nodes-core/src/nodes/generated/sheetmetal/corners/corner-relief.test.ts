
import { describe, it, expect } from 'vitest';
import { CornerReliefNode } from './cornerrelief.node';
import { createTestContext } from './../../test-utils';

describe('CornerReliefNode', () => {
  it('should create CornerRelief', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      corners: null
    };
    const params = {
      reliefType: "circular",
      reliefSize: 5,
      reliefRatio: 0.5
    };

    const result = await CornerReliefNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});