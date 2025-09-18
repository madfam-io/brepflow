
import { NodeDefinition } from '@brepflow/types';

interface Params {
  url: string;
  reconnect: boolean;
  heartbeat: number;
}
interface Inputs {
  message?: string;
}
interface Outputs {
  connected: boolean;
  messages: string[];
  lastMessage: string;
}

export const WebSocketClientNode: NodeDefinition<WebSocketClientInputs, WebSocketClientOutputs, WebSocketClientParams> = {
  type: 'Interoperability::WebSocketClient',
  category: 'Interoperability',
  subcategory: 'Streaming',

  metadata: {
    label: 'WebSocketClient',
    description: 'Connect to WebSocket data streams',
    
    
  },

  params: {
        url: {
      "default": "",
      "description": "WebSocket server URL"
    },
    reconnect: {
      "default": true
    },
    heartbeat: {
      "default": 30,
      "min": 0,
      "max": 300,
      "description": "Heartbeat interval"
    }
  },

  inputs: {
        message: 'string'
  },

  outputs: {
        connected: 'boolean',
    messages: 'string[]',
    lastMessage: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'webSocketClient',
      params: {
        message: inputs.message,
        url: params.url,
        reconnect: params.reconnect,
        heartbeat: params.heartbeat
      }
    });

    return {
      connected: result,
      messages: result,
      lastMessage: result
    };
  }
};
