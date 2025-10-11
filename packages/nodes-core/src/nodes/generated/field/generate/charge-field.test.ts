
import { describe, it, expect } from 'vitest';
import { ChargeFieldNode } from './charge-field.node';
import { createTestContext } from '../test-utils';

describe('ChargeFieldNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      points: undefined
    } as any;
    const params = {
      charge: 1,
      falloff: "inverse-square"
    } as any;

    const result = await ChargeFieldNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
