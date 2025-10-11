
import { describe, it, expect } from 'vitest';
import { FireWallNode } from './fire-wall.node';
import { createTestContext } from '../test-utils';

describe('FireWallNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      path: undefined
    } as any;
    const params = {
      fireRating: "2-hour",
      thickness: 250
    } as any;

    const result = await FireWallNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
