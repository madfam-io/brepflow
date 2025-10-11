
import { describe, it, expect } from 'vitest';
import { FixedNode } from './fixed.node';
import { createTestContext } from '../test-utils';

describe('FixedNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      entity: undefined
    } as any;
    const params = {

    } as any;

    const result = await FixedNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
