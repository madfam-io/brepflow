
import { describe, it, expect } from 'vitest';
import { MuqarnasNode } from './muqarnas-node';
import { createTestContext } from '../test-utils';

describe('MuqarnasNode', () => {
  it('should create Muqarnas', async () => {
    const context = createTestContext();
    const inputs = {
      base: null
    };
    const params = {
      levels: 3,
      cellType: "mixed"
    };

    const result = await MuqarnasNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.muqarnas).toBeDefined();
  });

  
});