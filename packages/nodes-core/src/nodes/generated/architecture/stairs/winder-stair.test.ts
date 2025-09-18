
import { describe, it, expect } from 'vitest';
import { WinderStairNode } from './winderstair-node';
import { createTestContext } from '../test-utils';

describe('WinderStairNode', () => {
  it('should create WinderStair', async () => {
    const context = createTestContext();
    const inputs = {
      path: null
    };
    const params = {
      winderCount: 3,
      turnAngle: 90
    };

    const result = await WinderStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.winderStair).toBeDefined();
  });

  
});