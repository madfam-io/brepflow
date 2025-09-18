
import { describe, it, expect } from 'vitest';
import { HyperbolaNode } from './hyperbola-node';
import { createTestContext } from '../test-utils';

describe('HyperbolaNode', () => {
  it('should create Hyperbola', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      majorRadius: 50,
      minorRadius: 30,
      startParam: -2,
      endParam: 2
    };

    const result = await HyperbolaNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});