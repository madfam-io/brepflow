
import { describe, it, expect } from 'vitest';
import { ArcTangentNode } from './arc-tangent.node';
import { createTestContext } from '../test-utils';

describe('ArcTangentNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      value: undefined
    } as any;
    const params = {
      angleUnit: "radians"
    } as any;

    const result = await ArcTangentNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
