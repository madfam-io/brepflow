
import { describe, it, expect } from 'vitest';
import { MQTTSubscriberNode } from './mqttsubscriber.node';
import { createTestContext } from '../test-utils';

describe('MQTTSubscriberNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      broker: "",
      port: 1883,
      topic: "",
      qos: "0"
    } as any;

    const result = await MQTTSubscriberNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
