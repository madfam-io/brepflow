
import { describe, it, expect } from 'vitest';
import { StairHandrailNode } from './stairhandrail-node';
import { createTestContext } from '../test-utils';

describe('StairHandrailNode', () => {
  it('should create StairHandrail', async () => {
    const context = createTestContext();
    const inputs = {
      stairEdge: /* test value */
    };
    const params = {
      height: 900,
      diameter: 50,
      mountType: "post"
    };

    const result = await StairHandrailNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.handrail).toBeDefined();
    expect(result.posts).toBeDefined();
  });

  
});