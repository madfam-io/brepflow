
import { describe, it, expect } from 'vitest';
import { Exp10Node } from './exp10-node';
import { createTestContext } from './../../test-utils';

describe('Exp10Node', () => {
  it('should create Exp10', async () => {
    const context = createTestContext();
    const inputs = {
      value: null
    };
    const params = {
      
    };

    const result = await Exp10Node.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});