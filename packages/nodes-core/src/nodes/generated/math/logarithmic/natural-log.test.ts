
import { describe, it, expect } from 'vitest';
import { NaturalLogNode } from './naturallog-node';
import { createTestContext } from '../test-utils';

describe('NaturalLogNode', () => {
  it('should create NaturalLog', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await NaturalLogNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});