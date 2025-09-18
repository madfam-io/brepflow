
import { describe, it, expect } from 'vitest';
import { AngleMeasurementNode } from './anglemeasurement-node';
import { createTestContext } from '../test-utils';

describe('AngleMeasurementNode', () => {
  it('should create AngleMeasurement', async () => {
    const context = createTestContext();
    const inputs = {
      vector1: /* test value */,
      vector2: /* test value */
    };
    const params = {
      units: "degrees",
      showAnnotation: true
    };

    const result = await AngleMeasurementNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.angle).toBeDefined();
    expect(result.complementAngle).toBeDefined();
    expect(result.angleBisector).toBeDefined();
  });

  
});