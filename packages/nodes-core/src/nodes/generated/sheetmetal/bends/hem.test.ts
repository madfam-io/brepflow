
import { describe, it, expect } from 'vitest';
import { HemNode } from './hem.node';
import { createTestContext } from '../test-utils';

describe('HemNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      sheet: undefined,
      edge: undefined
    } as any;
    const params = {
      hemType: "closed",
      hemLength: 10,
      hemGap: 0.5,
      hemRadius: 0.5
    } as any;

    const result = await HemNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
