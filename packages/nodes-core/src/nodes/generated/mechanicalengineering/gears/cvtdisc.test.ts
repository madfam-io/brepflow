
import { describe, it, expect } from 'vitest';
import { CVTDiscNode } from './cvtdisc.node';
import { createTestContext } from '../test-utils';

describe('CVTDiscNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      minDiameter: 30,
      maxDiameter: 100,
      coneAngle: 11,
      shaftDiameter: 20
    } as any;

    const result = await CVTDiscNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
