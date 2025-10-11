
import { describe, it, expect } from 'vitest';
import { FieldColorNode } from './field-color.node';
import { createTestContext } from '../test-utils';

describe('FieldColorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined,
      field: undefined
    } as any;
    const params = {
      gradient: "rainbow"
    } as any;

    const result = await FieldColorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
