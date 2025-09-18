
import { describe, it, expect } from 'vitest';
import { CurveParameterNode } from './curveparameter-node';
import { createTestContext } from '../test-utils';

describe('CurveParameterNode', () => {
  it('should create CurveParameter', async () => {
    const context = createTestContext();
    const inputs = {
      curve: /* test value */
    };
    const params = {
      samples: 50,
      showParameter: true
    };

    const result = await CurveParameterNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.parameterRange).toBeDefined();
    expect(result.samplePoints).toBeDefined();
    expect(result.parameterValues).toBeDefined();
  });

  
});