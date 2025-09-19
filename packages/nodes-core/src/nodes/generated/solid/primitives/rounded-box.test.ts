
import { describe, it, expect } from 'vitest';
import { RoundedBoxNode } from './rounded-box.node';
import { createTestContext } from './../../test-utils';

describe('RoundedBoxNode', () => {
  it('should create RoundedBox', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      width: 100,
      depth: 100,
      height: 100,
      radius: 10
    };

    const result = await RoundedBoxNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});