
import { describe, it, expect } from 'vitest';
import { LinearRibNode } from './linearrib-node';
import { createTestContext } from '../test-utils';

describe('LinearRibNode', () => {
  it('should create LinearRib', async () => {
    const context = createTestContext();
    const inputs = {
      face: null,
      path: null
    };
    const params = {
      thickness: 3,
      height: 20,
      draftAngle: 1,
      topRadius: 1
    };

    const result = await LinearRibNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});