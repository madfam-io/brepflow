
import { describe, it, expect } from 'vitest';
import { MQTTSubscriberNode } from './mqttsubscriber-node';
import { createTestContext } from '../test-utils';

describe('MQTTSubscriberNode', () => {
  it('should create MQTTSubscriber', async () => {
    const context = createTestContext();
    const inputs = {
      
    };
    const params = {
      broker: "",
      port: 1883,
      topic: "",
      qos: "0"
    };

    const result = await MQTTSubscriberNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.connected).toBeDefined();
    expect(result.messages).toBeDefined();
    expect(result.lastMessage).toBeDefined();
  });

  
});