
import { describe, it, expect } from 'vitest';
import { FieldMaxNode } from './field-max.node';
import { createTestContext } from '../test-utils';

describe('FieldMaxNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fields: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldMaxNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
