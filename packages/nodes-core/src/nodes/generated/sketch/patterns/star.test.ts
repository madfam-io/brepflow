
import { describe, it, expect } from 'vitest';
import { StarNode } from './star.node';
import { createTestContext } from '../test-utils';

describe('StarNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      points: 5,
      outerRadius: 100,
      innerRadius: 40
    } as any;

    const result = await StarNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
