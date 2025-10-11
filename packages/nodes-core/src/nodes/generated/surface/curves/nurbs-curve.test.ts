
import { describe, it, expect } from 'vitest';
import { NurbsCurveNode } from './nurbs-curve.node';
import { createTestContext } from '../test-utils';

describe('NurbsCurveNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      controlPoints: undefined
    } as any;
    const params = {
      degree: 3,
      periodic: false
    } as any;

    const result = await NurbsCurveNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
