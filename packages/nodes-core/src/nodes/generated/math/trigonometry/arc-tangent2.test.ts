
import { describe, it, expect } from 'vitest';
import { ArcTangent2Node } from './arc-tangent2.node';
import { createTestContext } from '../test-utils';

describe('ArcTangent2Node', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      y: undefined,
      x: undefined
    } as any;
    const params = {
      angleUnit: "radians"
    } as any;

    const result = await ArcTangent2Node.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
