
import { describe, it, expect } from 'vitest';
import { VaultedCeilingNode } from './vaultedceiling.node';
import { createTestContext } from './../../test-utils';

describe('VaultedCeilingNode', () => {
  it('should create VaultedCeiling', async () => {
    const context = createTestContext();
    const inputs = {
      ceilingOutline: null
    };
    const params = {
      vaultType: "barrel",
      rise: 1000
    };

    const result = await VaultedCeilingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.vaultedCeiling).toBeDefined();
  });

  
});