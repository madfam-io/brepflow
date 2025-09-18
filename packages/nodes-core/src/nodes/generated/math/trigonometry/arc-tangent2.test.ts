
import { describe, it, expect } from 'vitest';
import { ArcTangent2Node } from './arctangent2-node';
import { createTestContext } from '../test-utils';

describe('ArcTangent2Node', () => {
  it('should create ArcTangent2', async () => {
    const context = createTestContext();
    const inputs = {
      y: /* test value */,
      x: /* test value */
    };
    const params = {
      angleUnit: "radians"
    };

    const result = await ArcTangent2Node.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.angle).toBeDefined();
  });

  
});