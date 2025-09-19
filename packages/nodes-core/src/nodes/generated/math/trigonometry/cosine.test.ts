
import { describe, it, expect } from 'vitest';
import { CosineNode } from './cosine.node';
import { createTestContext } from './../../test-utils';

describe('CosineNode', () => {
  it('should create Cosine', async () => {
    const context = createTestContext();
    const inputs = {
      angle: null
    };
    const params = {
      angleUnit: "radians"
    };

    const result = await CosineNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});