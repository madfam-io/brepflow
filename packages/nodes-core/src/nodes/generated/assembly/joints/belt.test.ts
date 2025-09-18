
import { describe, it, expect } from 'vitest';
import { BeltNode } from './belt-node';
import { createTestContext } from '../test-utils';

describe('BeltNode', () => {
  it('should create Belt', async () => {
    const context = createTestContext();
    const inputs = {
      pulley1: null,
      pulley2: null
    };
    const params = {
      ratio: 1
    };

    const result = await BeltNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.joint).toBeDefined();
  });

  
});