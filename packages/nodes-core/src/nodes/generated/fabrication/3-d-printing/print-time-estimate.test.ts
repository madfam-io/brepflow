
import { describe, it, expect } from 'vitest';
import { PrintTimeEstimateNode } from './print-time-estimate.node';
import { createTestContext } from '../test-utils';

describe('PrintTimeEstimateNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      printSpeed: 60,
      travelSpeed: 120,
      layerHeight: 0.2
    } as any;

    const result = await PrintTimeEstimateNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
