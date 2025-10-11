
import { describe, it, expect } from 'vitest';
import { FieldSmoothNode } from './field-smooth.node';
import { createTestContext } from '../test-utils';

describe('FieldSmoothNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {
      iterations: 3,
      factor: 0.5
    } as any;

    const result = await FieldSmoothNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
