
import { describe, it, expect } from 'vitest';
import { VaultedCeilingNode } from './vaulted-ceiling.node';
import { createTestContext } from '../test-utils';

describe('VaultedCeilingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      ceilingOutline: undefined
    } as any;
    const params = {
      vaultType: "barrel",
      rise: 1000
    } as any;

    const result = await VaultedCeilingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
