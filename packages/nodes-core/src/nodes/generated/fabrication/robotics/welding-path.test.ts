
import { describe, it, expect } from 'vitest';
import { WeldingPathNode } from './welding-path.node';
import { createTestContext } from '../test-utils';

describe('WeldingPathNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      seamPath: undefined
    } as any;
    const params = {
      weldType: "mig",
      weavePattern: "none",
      travelSpeed: 10
    } as any;

    const result = await WeldingPathNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
