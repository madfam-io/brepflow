
import { describe, it, expect } from 'vitest';
import { ToBase64Node } from './tobase64-node';
import { createTestContext } from '../test-utils';

describe('ToBase64Node', () => {
  it('should create ToBase64', async () => {
    const context = createTestContext();
    const inputs = {
      data: /* test value */
    };
    const params = {
      
    };

    const result = await ToBase64Node.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.base64).toBeDefined();
  });

  
});