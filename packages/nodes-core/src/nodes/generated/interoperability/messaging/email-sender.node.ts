
import { NodeDefinition } from '@brepflow/types';

interface Params {
  smtpServer: string;
  port: number;
  username: string;
  password: string;
}
interface Inputs {
  to: string;
  subject: string;
  body: string;
  attachments?: string[];
}
interface Outputs {
  sent: boolean;
  messageId: string;
}

export const EmailSenderNode: NodeDefinition<EmailSenderInputs, EmailSenderOutputs, EmailSenderParams> = {
  type: 'Interoperability::EmailSender',
  category: 'Interoperability',
  subcategory: 'Messaging',

  metadata: {
    label: 'EmailSender',
    description: 'Send email notifications',
    
    
  },

  params: {
        smtpServer: {
      "default": "",
      "description": "SMTP server address"
    },
    port: {
      "default": 587,
      "min": 1,
      "max": 65535
    },
    username: {
      "default": ""
    },
    password: {
      "default": ""
    }
  },

  inputs: {
        to: 'string',
    subject: 'string',
    body: 'string',
    attachments: 'string[]'
  },

  outputs: {
        sent: 'boolean',
    messageId: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'emailSender',
      params: {
        to: inputs.to,
        subject: inputs.subject,
        body: inputs.body,
        attachments: inputs.attachments,
        smtpServer: params.smtpServer,
        port: params.port,
        username: params.username,
        password: params.password
      }
    });

    return {
      sent: result,
      messageId: result
    };
  }
};
