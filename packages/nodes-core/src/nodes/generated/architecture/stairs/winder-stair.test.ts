
import { describe, it, expect } from 'vitest';
import { WinderStairNode } from './winder-stair.node';
import { createTestContext } from '../test-utils';

describe('WinderStairNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined
    } as any;
    const params = {
      winderCount: 3,
      turnAngle: 90
    } as any;

    const result = await WinderStairNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
