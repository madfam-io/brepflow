
import { describe, it, expect } from 'vitest';
import { MQTTPublisherNode } from './mqttpublisher.node';
import { createTestContext } from '../test-utils';

describe('MQTTPublisherNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      payload: undefined
    } as any;
    const params = {
      broker: "",
      port: 1883,
      topic: "",
      qos: "0"
    } as any;

    const result = await MQTTPublisherNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
