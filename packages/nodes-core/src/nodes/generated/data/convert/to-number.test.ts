
import { describe, it, expect } from 'vitest';
import { ToNumberNode } from './tonumber-node';
import { createTestContext } from '../test-utils';

describe('ToNumberNode', () => {
  it('should create ToNumber', async () => {
    const context = createTestContext();
    const inputs = {
      data: null
    };
    const params = {
      
    };

    const result = await ToNumberNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.number).toBeDefined();
    expect(result.isValid).toBeDefined();
  });

  
});