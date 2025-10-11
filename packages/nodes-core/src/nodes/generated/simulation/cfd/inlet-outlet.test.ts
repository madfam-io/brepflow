
import { describe, it, expect } from 'vitest';
import { InletOutletNode } from './inlet-outlet.node';
import { createTestContext } from '../test-utils';

describe('InletOutletNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: undefined,
      boundaryFaces: undefined
    } as any;
    const params = {
      boundaryType: "velocity-inlet",
      velocity: 1,
      pressure: 101325,
      temperature: 293
    } as any;

    const result = await InletOutletNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
