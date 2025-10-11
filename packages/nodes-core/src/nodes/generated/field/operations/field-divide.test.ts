
import { describe, it, expect } from 'vitest';
import { FieldDivideNode } from './field-divide.node';
import { createTestContext } from '../test-utils';

describe('FieldDivideNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      fieldA: undefined,
      fieldB: undefined
    } as any;
    const params = {
      epsilon: 0.001
    } as any;

    const result = await FieldDivideNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
