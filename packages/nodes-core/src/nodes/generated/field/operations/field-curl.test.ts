
import { describe, it, expect } from 'vitest';
import { FieldCurlNode } from './fieldcurl-node';
import { createTestContext } from '../test-utils';

describe('FieldCurlNode', () => {
  it('should create FieldCurl', async () => {
    const context = createTestContext();
    const inputs = {
      field: /* test value */
    };
    const params = {
      
    };

    const result = await FieldCurlNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.curl).toBeDefined();
  });

  
});