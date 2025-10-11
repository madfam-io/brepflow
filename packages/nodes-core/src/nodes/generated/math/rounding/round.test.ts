
import { describe, it, expect } from 'vitest';
import { RoundNode } from './round.node';
import { createTestContext } from '../test-utils';

describe('RoundNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {

    } as any;

    const result = await RoundNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
