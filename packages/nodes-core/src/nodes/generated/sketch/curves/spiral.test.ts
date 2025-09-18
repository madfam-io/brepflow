
import { describe, it, expect } from 'vitest';
import { SpiralNode } from './spiral-node';
import { createTestContext } from '../test-utils';

describe('SpiralNode', () => {
  it('should create Spiral', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      startRadius: 10,
      endRadius: 100,
      turns: 3,
      type: "archimedean"
    };

    const result = await SpiralNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.spiral).toBeDefined();
  });

  
});