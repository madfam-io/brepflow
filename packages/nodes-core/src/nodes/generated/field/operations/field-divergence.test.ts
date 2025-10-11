
import { describe, it, expect } from 'vitest';
import { FieldDivergenceNode } from './field-divergence.node';
import { createTestContext } from '../test-utils';

describe('FieldDivergenceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      field: undefined
    } as any;
    const params = {

    } as any;

    const result = await FieldDivergenceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
