
import { describe, it, expect } from 'vitest';
import { SimpleHoleNode } from './simplehole-node';
import { createTestContext } from '../test-utils';

describe('SimpleHoleNode', () => {
  it('should create SimpleHole', async () => {
    const context = createTestContext();
    const inputs = {
      solid: /* test value */,
      position: /* test value */
    };
    const params = {
      diameter: 10,
      depth: -1
    };

    const result = await SimpleHoleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
  it('should handle M6 Clearance Hole', async () => {
    const context = createTestContext();
    const params = {
      "diameter": 6.5,
      "depth": -1
    };

    const result = await SimpleHoleNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
  
  it('should handle M10 Tapped Hole', async () => {
    const context = createTestContext();
    const params = {
      "diameter": 8.5,
      "depth": 20
    };

    const result = await SimpleHoleNode.evaluate(context, {}, params);

    expect(result).toBeDefined();
  });
});