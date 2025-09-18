
import { describe, it, expect } from 'vitest';
import { HyperbolicTangentNode } from './hyperbolictangent-node';
import { createTestContext } from '../test-utils';

describe('HyperbolicTangentNode', () => {
  it('should create HyperbolicTangent', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */
    };
    const params = {
      
    };

    const result = await HyperbolicTangentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});