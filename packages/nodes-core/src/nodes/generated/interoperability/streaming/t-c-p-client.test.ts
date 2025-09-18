
import { describe, it, expect } from 'vitest';
import { TCPClientNode } from './tcpclient-node';
import { createTestContext } from '../test-utils';

describe('TCPClientNode', () => {
  it('should create TCPClient', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      host: "localhost",
      port: 8080,
      timeout: 30
    };

    const result = await TCPClientNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.connected).toBeDefined();
    expect(result.response).toBeDefined();
    expect(result.error).toBeDefined();
  });

  
});