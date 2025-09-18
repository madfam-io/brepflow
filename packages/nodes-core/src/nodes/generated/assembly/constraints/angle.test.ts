
import { describe, it, expect } from 'vitest';
import { AngleNode } from './angle-node';
import { createTestContext } from '../test-utils';

describe('AngleNode', () => {
  it('should create Angle', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: null,
      entity2: null
    };
    const params = {
      angle: 90
    };

    const result = await AngleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.constrained).toBeDefined();
    expect(result.constraint).toBeDefined();
  });

  
});