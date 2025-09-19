
import { describe, it, expect } from 'vitest';
import { WebSocketClientNode } from './websocketclient.node';
import { createTestContext } from './../../test-utils';

describe('WebSocketClientNode', () => {
  it('should create WebSocketClient', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      url: "",
      reconnect: true,
      heartbeat: 30
    };

    const result = await WebSocketClientNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.connected).toBeDefined();
    expect(result.messages).toBeDefined();
    expect(result.lastMessage).toBeDefined();
  });

  
});