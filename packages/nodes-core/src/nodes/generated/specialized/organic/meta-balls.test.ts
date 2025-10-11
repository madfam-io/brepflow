
import { describe, it, expect } from 'vitest';
import { MetaBallsNode } from './meta-balls.node';
import { createTestContext } from '../test-utils';

describe('MetaBallsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      centers: undefined,
      radii: undefined
    } as any;
    const params = {
      threshold: 1,
      resolution: 50
    } as any;

    const result = await MetaBallsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
