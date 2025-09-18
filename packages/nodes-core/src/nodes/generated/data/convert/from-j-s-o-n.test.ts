
import { describe, it, expect } from 'vitest';
import { FromJSONNode } from './fromjson-node';
import { createTestContext } from '../test-utils';

describe('FromJSONNode', () => {
  it('should create FromJSON', async () => {
    const context = createTestContext();
    const inputs = {
      json: null
    };
    const params = {
      
    };

    const result = await FromJSONNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.isValid).toBeDefined();
  });

  
});