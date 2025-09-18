
import { describe, it, expect } from 'vitest';
import { HelixNode } from './helix-node';
import { createTestContext } from '../test-utils';

describe('HelixNode', () => {
  it('should create Helix', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      radius: 50,
      pitch: 20,
      height: 100,
      leftHanded: false
    };

    const result = await HelixNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.helix).toBeDefined();
  });

  
});