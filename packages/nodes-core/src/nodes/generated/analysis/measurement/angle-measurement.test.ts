
import { describe, it, expect } from 'vitest';
import { AngleMeasurementNode } from './angle-measurement.node';
import { createTestContext } from '../test-utils';

describe('AngleMeasurementNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      vector1: undefined,
      vector2: undefined
    } as any;
    const params = {
      units: "degrees",
      showAnnotation: true
    } as any;

    const result = await AngleMeasurementNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
