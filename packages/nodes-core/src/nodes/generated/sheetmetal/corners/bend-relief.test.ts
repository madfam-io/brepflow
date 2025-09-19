
import { describe, it, expect } from 'vitest';
import { BendReliefNode } from './bendrelief.node';
import { createTestContext } from './../../test-utils';

describe('BendReliefNode', () => {
  it('should create BendRelief', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: null,
      bends: null
    };
    const params = {
      reliefType: "rectangular",
      reliefDepth: 5,
      reliefWidth: 2
    };

    const result = await BendReliefNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});