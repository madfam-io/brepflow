
import { describe, it, expect } from 'vitest';
import { FieldPotentialNode } from './field-potential.node';
import { createTestContext } from '../test-utils';

describe('FieldPotentialNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      referencePoint: "[0, 0, 0]"
    } as any;

    const result = await FieldPotentialNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
