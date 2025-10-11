
import { describe, it, expect } from 'vitest';
import { ComplexPhaseNode } from './complex-phase.node';
import { createTestContext } from '../test-utils';

describe('ComplexPhaseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      complex: undefined
    } as any;
    const params = {

    } as any;

    const result = await ComplexPhaseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
