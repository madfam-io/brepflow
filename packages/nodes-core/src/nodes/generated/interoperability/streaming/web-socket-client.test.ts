
import { describe, it, expect } from 'vitest';
import { WebSocketClientNode } from './web-socket-client.node';
import { createTestContext } from '../test-utils';

describe('WebSocketClientNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      url: "",
      reconnect: true,
      heartbeat: 30
    } as any;

    const result = await WebSocketClientNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
