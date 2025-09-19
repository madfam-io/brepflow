
import { describe, it, expect } from 'vitest';
import { PhyllotaxisPatternNode } from './phyllotaxispattern.node';
import { createTestContext } from './../../test-utils';

describe('PhyllotaxisPatternNode', () => {
  it('should create PhyllotaxisPattern', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      count: 100,
      angle: 137.5,
      c: 1
    };

    const result = await PhyllotaxisPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.points).toBeDefined();
    expect(result.spiral).toBeDefined();
  });

  
});