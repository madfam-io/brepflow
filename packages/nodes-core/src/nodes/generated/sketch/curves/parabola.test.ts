
import { describe, it, expect } from 'vitest';
import { ParabolaNode } from './parabola-node';
import { createTestContext } from '../test-utils';

describe('ParabolaNode', () => {
  it('should create Parabola', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      focalLength: 10,
      startParam: -100,
      endParam: 100
    };

    const result = await ParabolaNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curve).toBeDefined();
  });

  
});