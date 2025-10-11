
import { describe, it, expect } from 'vitest';
import { StairHandrailNode } from './stair-handrail.node';
import { createTestContext } from '../test-utils';

describe('StairHandrailNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      stairEdge: undefined
    } as any;
    const params = {
      height: 900,
      diameter: 50,
      mountType: "post"
    } as any;

    const result = await StairHandrailNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
