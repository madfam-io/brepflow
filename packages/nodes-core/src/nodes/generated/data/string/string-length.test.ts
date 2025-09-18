
import { describe, it, expect } from 'vitest';
import { StringLengthNode } from './stringlength-node';
import { createTestContext } from '../test-utils';

describe('StringLengthNode', () => {
  it('should create StringLength', async () => {
    const context = createTestContext();
    const inputs = {
      string: null
    };
    const params = {
      
    };

    const result = await StringLengthNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.length).toBeDefined();
  });

  
});