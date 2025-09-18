
import { describe, it, expect } from 'vitest';
import { RainScreenNode } from './rainscreen-node';
import { createTestContext } from '../test-utils';

describe('RainScreenNode', () => {
  it('should create RainScreen', async () => {
    const context = createTestContext();
    const inputs = {
      wall: /* test value */
    };
    const params = {
      claddingType: "composite",
      ventGap: 25
    };

    const result = await RainScreenNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.rainScreen).toBeDefined();
  });

  
});