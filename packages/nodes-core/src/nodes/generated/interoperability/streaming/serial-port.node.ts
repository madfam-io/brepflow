
import { NodeDefinition } from '@brepflow/types';

interface Params {
  port: string;
  baudRate: string;
  dataBits: string;
  parity: string;
}
interface Inputs {
  data?: string;
}
interface Outputs {
  connected: boolean;
  received: string;
  buffer: string[];
}

export const SerialPortNode: NodeDefinition<SerialPortInputs, SerialPortOutputs, SerialPortParams> = {
  type: 'Interoperability::SerialPort',
  category: 'Interoperability',
  subcategory: 'Streaming',

  metadata: {
    label: 'SerialPort',
    description: 'Communicate with serial devices',
    
    
  },

  params: {
        port: {
      "default": "COM1",
      "description": "Serial port name"
    },
    baudRate: {
      "default": "9600",
      "options": [
        "9600",
        "19200",
        "38400",
        "57600",
        "115200"
      ]
    },
    dataBits: {
      "default": "8",
      "options": [
        "7",
        "8"
      ]
    },
    parity: {
      "default": "none",
      "options": [
        "none",
        "even",
        "odd"
      ]
    }
  },

  inputs: {
        data: 'string'
  },

  outputs: {
        connected: 'boolean',
    received: 'string',
    buffer: 'string[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'serialPort',
      params: {
        data: inputs.data,
        port: params.port,
        baudRate: params.baudRate,
        dataBits: params.dataBits,
        parity: params.parity
      }
    });

    return {
      connected: result,
      received: result,
      buffer: result
    };
  }
};
