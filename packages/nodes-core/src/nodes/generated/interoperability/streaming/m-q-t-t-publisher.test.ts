
import { describe, it, expect } from 'vitest';
import { MQTTPublisherNode } from './mqttpublisher-node';
import { createTestContext } from '../test-utils';

describe('MQTTPublisherNode', () => {
  it('should create MQTTPublisher', async () => {
    const context = createTestContext();
    const inputs = {
      payload: /* test value */
    };
    const params = {
      broker: "",
      port: 1883,
      topic: "",
      qos: "0"
    };

    const result = await MQTTPublisherNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.published).toBeDefined();
    expect(result.messageId).toBeDefined();
  });

  
});