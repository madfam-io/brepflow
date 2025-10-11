
import { describe, it, expect } from 'vitest';
import { FieldClampNode } from './field-clamp.node';
import { createTestContext } from '../test-utils';

describe('FieldClampNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {
      min: 0,
      max: 1
    } as any;

    const result = await FieldClampNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
