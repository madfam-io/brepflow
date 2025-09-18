
import { describe, it, expect } from 'vitest';
import { CountersinkHoleNode } from './countersinkhole-node';
import { createTestContext } from '../test-utils';

describe('CountersinkHoleNode', () => {
  it('should create CountersinkHole', async () => {
    const context = createTestContext();
    const inputs = {
      solid: null,
      position: null
    };
    const params = {
      holeDiameter: 6.5,
      countersinkDiameter: 12,
      angle: "90",
      depth: -1
    };

    const result = await CountersinkHoleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});