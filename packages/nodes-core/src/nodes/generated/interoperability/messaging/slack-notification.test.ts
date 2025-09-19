
import { describe, it, expect } from 'vitest';
import { SlackNotificationNode } from './slacknotification.node';
import { createTestContext } from './../../test-utils';

describe('SlackNotificationNode', () => {
  it('should create SlackNotification', async () => {
    const context = createTestContext();
    const inputs = {
      message: null
    };
    const params = {
      webhookUrl: "",
      channel: "#general",
      username: "BrepFlow"
    };

    const result = await SlackNotificationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sent).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  
});