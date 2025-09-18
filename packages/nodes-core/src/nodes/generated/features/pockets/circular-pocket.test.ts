
import { describe, it, expect } from 'vitest';
import { CircularPocketNode } from './circularpocket-node';
import { createTestContext } from '../test-utils';

describe('CircularPocketNode', () => {
  it('should create CircularPocket', async () => {
    const context = createTestContext();
    const inputs = {
      face: null,
      position: null
    };
    const params = {
      diameter: 40,
      depth: 10,
      draftAngle: 0
    };

    const result = await CircularPocketNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});