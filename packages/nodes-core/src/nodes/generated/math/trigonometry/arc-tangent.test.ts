
import { describe, it, expect } from 'vitest';
import { ArcTangentNode } from './arctangent.node';
import { createTestContext } from './../../test-utils';

describe('ArcTangentNode', () => {
  it('should create ArcTangent', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      angleUnit: "radians"
    };

    const result = await ArcTangentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.angle).toBeDefined();
  });

  
});