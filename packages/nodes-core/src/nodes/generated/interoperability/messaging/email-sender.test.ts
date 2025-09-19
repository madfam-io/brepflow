
import { describe, it, expect } from 'vitest';
import { EmailSenderNode } from './emailsender.node';
import { createTestContext } from './../../test-utils';

describe('EmailSenderNode', () => {
  it('should create EmailSender', async () => {
    const context = createTestContext();
    const inputs = {
      to: null,
      subject: null,
      body: null
    };
    const params = {
      smtpServer: "",
      port: 587,
      username: "",
      password: ""
    };

    const result = await EmailSenderNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.sent).toBeDefined();
    expect(result.messageId).toBeDefined();
  });

  
});