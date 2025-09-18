
import { describe, it, expect } from 'vitest';
import { CounterboreHoleNode } from './counterborehole-node';
import { createTestContext } from '../test-utils';

describe('CounterboreHoleNode', () => {
  it('should create CounterboreHole', async () => {
    const context = createTestContext();
    const inputs = {
      solid: /* test value */,
      position: /* test value */
    };
    const params = {
      holeDiameter: 6.5,
      counterbore: 11,
      cbDepth: 6,
      holeDepth: -1
    };

    const result = await CounterboreHoleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
  it('should handle M6 SHCS', async () => {
    const context = createTestContext();
    const params = {
      "holeDiameter": 6.5,
      "counterbore": 11,
      "cbDepth": 6
    };

    const result = await CounterboreHoleNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
  
  it('should handle M10 SHCS', async () => {
    const context = createTestContext();
    const params = {
      "holeDiameter": 11,
      "counterbore": 18,
      "cbDepth": 10
    };

    const result = await CounterboreHoleNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
});