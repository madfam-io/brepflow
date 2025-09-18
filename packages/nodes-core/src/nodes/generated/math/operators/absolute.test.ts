
import { describe, it, expect } from 'vitest';
import { AbsoluteNode } from './absolute-node';
import { createTestContext } from '../test-utils';

describe('AbsoluteNode', () => {
  it('should create Absolute', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await AbsoluteNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});