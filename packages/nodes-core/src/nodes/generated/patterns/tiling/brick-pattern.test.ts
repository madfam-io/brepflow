
import { describe, it, expect } from 'vitest';
import { BrickPatternNode } from './brickpattern-node';
import { createTestContext } from '../test-utils';

describe('BrickPatternNode', () => {
  it('should create BrickPattern', async () => {
    const context = createTestContext();
    const inputs = {
      surface: /* test value */
    };
    const params = {
      bond: "running",
      brickLength: 20,
      brickWidth: 10,
      mortarGap: 1
    };

    const result = await BrickPatternNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bricks).toBeDefined();
  });

  
});