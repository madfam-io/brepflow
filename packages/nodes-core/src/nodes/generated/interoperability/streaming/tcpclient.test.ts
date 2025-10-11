
import { describe, it, expect } from 'vitest';
import { TCPClientNode } from './tcpclient.node';
import { createTestContext } from '../test-utils';

describe('TCPClientNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      host: "localhost",
      port: 8080,
      timeout: 30
    } as any;

    const result = await TCPClientNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
