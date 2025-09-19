
import { describe, it, expect } from 'vitest';
import { ComplexPhaseNode } from './complexphase.node';
import { createTestContext } from './../../test-utils';

describe('ComplexPhaseNode', () => {
  it('should create ComplexPhase', async () => {
    const context = createTestContext();
    const inputs = {
      complex: null
    };
    const params = {
      
    };

    const result = await ComplexPhaseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.phase).toBeDefined();
  });

  
});