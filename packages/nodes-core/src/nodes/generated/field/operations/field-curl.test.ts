
import { describe, it, expect } from 'vitest';
import { FieldCurlNode } from './field-curl.node';
import { createTestContext } from '../test-utils';

describe('FieldCurlNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldCurlNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
