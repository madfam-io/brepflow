
import { describe, it, expect } from 'vitest';
import { ArcCosineNode } from './arccosine.node';
import { createTestContext } from './../../test-utils';

describe('ArcCosineNode', () => {
  it('should create ArcCosine', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      angleUnit: "radians"
    };

    const result = await ArcCosineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.angle).toBeDefined();
  });

  
});