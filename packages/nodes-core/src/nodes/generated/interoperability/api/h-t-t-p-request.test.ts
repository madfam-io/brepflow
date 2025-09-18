
import { describe, it, expect } from 'vitest';
import { HTTPRequestNode } from './httprequest-node';
import { createTestContext } from '../test-utils';

describe('HTTPRequestNode', () => {
  it('should create HTTPRequest', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      method: "GET",
      url: "",
      timeout: 30,
      retries: 3
    };

    const result = await HTTPRequestNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.response).toBeDefined();
    expect(result.statusCode).toBeDefined();
    expect(result.headers).toBeDefined();
  });

  
});