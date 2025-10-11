
import { describe, it, expect } from 'vitest';
import { CompoundNode } from './compound.node';
import { createTestContext } from '../test-utils';

describe('CompoundNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined
    } as any;
    const params = {

    } as any;

    const result = await CompoundNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
