
import { describe, it, expect } from 'vitest';
import { FieldAddNode } from './field-add.node';
import { createTestContext } from '../test-utils';

describe('FieldAddNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: undefined,
      fieldB: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldAddNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
