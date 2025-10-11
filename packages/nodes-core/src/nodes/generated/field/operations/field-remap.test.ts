
import { describe, it, expect } from 'vitest';
import { FieldRemapNode } from './field-remap.node';
import { createTestContext } from '../test-utils';

describe('FieldRemapNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {
      fromMin: 0,
      fromMax: 1,
      toMin: 0,
      toMax: 100
    } as any;

    const result = await FieldRemapNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
