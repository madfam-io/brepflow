
import { describe, it, expect } from 'vitest';
import { CoincidentNode } from './coincident-node';
import { createTestContext } from '../test-utils';

describe('CoincidentNode', () => {
  it('should create Coincident', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: null,
      entity2: null
    };
    const params = {
      tolerance: 0.001
    };

    const result = await CoincidentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.constrained).toBeDefined();
    expect(result.constraint).toBeDefined();
  });

  
});