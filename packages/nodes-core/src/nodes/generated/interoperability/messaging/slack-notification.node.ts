
import { NodeDefinition } from '@brepflow/types';

interface Params {
  webhookUrl: string;
  channel: string;
  username: string;
}
interface Inputs {
  message: string;
  attachments?: Properties[];
}
interface Outputs {
  sent: boolean;
  timestamp: string;
}

export const SlackNotificationNode: NodeDefinition<SlackNotificationInputs, SlackNotificationOutputs, SlackNotificationParams> = {
  type: 'Interoperability::SlackNotification',
  category: 'Interoperability',
  subcategory: 'Messaging',

  metadata: {
    label: 'SlackNotification',
    description: 'Send Slack notifications',
    
    
  },

  params: {
        webhookUrl: {
      "default": "",
      "description": "Slack webhook URL"
    },
    channel: {
      "default": "#general"
    },
    username: {
      "default": "BrepFlow"
    }
  },

  inputs: {
        message: 'string',
    attachments: 'Properties[]'
  },

  outputs: {
        sent: 'boolean',
    timestamp: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'slackNotification',
      params: {
        message: inputs.message,
        attachments: inputs.attachments,
        webhookUrl: params.webhookUrl,
        channel: params.channel,
        username: params.username
      }
    });

    return {
      sent: result,
      timestamp: result
    };
  }
};
