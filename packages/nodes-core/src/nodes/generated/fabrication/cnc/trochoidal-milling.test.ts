
import { describe, it, expect } from 'vitest';
import { TrochoidalMillingNode } from './trochoidalmilling-node';
import { createTestContext } from '../test-utils';

describe('TrochoidalMillingNode', () => {
  it('should create TrochoidalMilling', async () => {
    const context = createTestContext();
    const inputs = {
      slot: null
    };
    const params = {
      trochoidWidth: 2,
      stepover: 0.3
    };

    const result = await TrochoidalMillingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.trochoidalPath).toBeDefined();
  });

  
});