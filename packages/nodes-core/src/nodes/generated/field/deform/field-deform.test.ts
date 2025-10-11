
import { describe, it, expect } from 'vitest';
import { FieldDeformFieldDeformNode } from './field-deform.node';
import { createTestContext } from '../test-utils';

describe('FieldDeformFieldDeformNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: undefined,
      field: undefined
    } as any;
    const params = {
      strength: 10
    } as any;

    const result = await FieldDeformFieldDeformNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
