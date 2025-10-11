
import { describe, it, expect } from 'vitest';
import { FieldDeformNode } from './field-deform.node';
import { createTestContext } from '../test-utils';

describe('FieldDeformNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: undefined,
      field: undefined
    } as any;
    const params = {
      strength: 10
    } as any;

    const result = await FieldDeformNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
