
import { describe, it, expect } from 'vitest';
import { FromBase64Node } from './frombase64-node';
import { createTestContext } from '../test-utils';

describe('FromBase64Node', () => {
  it('should create FromBase64', async () => {
    const context = createTestContext();
    const inputs = {
      base64: null
    };
    const params = {
      
    };

    const result = await FromBase64Node.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
  });

  
});