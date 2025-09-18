
import { describe, it, expect } from 'vitest';
import { LinearFieldNode } from './linearfield-node';
import { createTestContext } from '../test-utils';

describe('LinearFieldNode', () => {
  it('should create LinearField', async () => {
    const context = createTestContext();
    const inputs = {
      bounds: null
    };
    const params = {
      direction: [1,0,0],
      min: 0,
      max: 1
    };

    const result = await LinearFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});