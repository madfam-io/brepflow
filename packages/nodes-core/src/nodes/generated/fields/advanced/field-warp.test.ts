
import { describe, it, expect } from 'vitest';
import { FieldWarpNode } from './field-warp.node';
import { createTestContext } from '../test-utils';

describe('FieldWarpNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      deformation: undefined
    } as any;
    const params = {
      strength: 1
    } as any;

    const result = await FieldWarpNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
