
import { describe, it, expect } from 'vitest';
import { FieldMinNode } from './field-min.node';
import { createTestContext } from '../test-utils';

describe('FieldMinNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fields: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldMinNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
