
import { describe, it, expect } from 'vitest';
import { ModeNode } from './mode-node';
import { createTestContext } from '../test-utils';

describe('ModeNode', () => {
  it('should create Mode', async () => {
    const context = createTestContext();
    const inputs = {
      values: /* test value */
    };
    const params = {
      
    };

    const result = await ModeNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mode).toBeDefined();
  });

  
});