
import { describe, it, expect } from 'vitest';
import { CapsuleNode } from './capsule-node';
import { createTestContext } from '../test-utils';

describe('CapsuleNode', () => {
  it('should create Capsule', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      radius: 25,
      height: 100
    };

    const result = await CapsuleNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.solid).toBeDefined();
  });

  
});