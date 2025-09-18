
import { describe, it, expect } from 'vitest';
import { EscapeStairNode } from './escapestair-node';
import { createTestContext } from '../test-utils';

describe('EscapeStairNode', () => {
  it('should create EscapeStair', async () => {
    const context = createTestContext();
    const inputs = {
      stairwell: /* test value */,
      floors: /* test value */
    };
    const params = {
      enclosure: "enclosed",
      width: 1200
    };

    const result = await EscapeStairNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.escapeStair).toBeDefined();
  });

  
});