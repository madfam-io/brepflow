
import { NodeDefinition } from '@brepflow/types';

interface Params {
  prefix: string;
  startNumber: number;
  digits: number;
  increment: number;
}
interface Inputs {
  count: number;
}
interface Outputs {
  serials: string[];
}

export const SerialNumberNode: NodeDefinition<SerialNumberInputs, SerialNumberOutputs, SerialNumberParams> = {
  type: 'Specialized::SerialNumber',
  category: 'Specialized',
  subcategory: 'Text',

  metadata: {
    label: 'SerialNumber',
    description: 'Generate serial numbers',
    
    
  },

  params: {
        prefix: {
      "default": "SN"
    },
    startNumber: {
      "default": 1,
      "min": 0,
      "max": 999999,
      "step": 1
    },
    digits: {
      "default": 6,
      "min": 1,
      "max": 10,
      "step": 1
    },
    increment: {
      "default": 1,
      "min": 1,
      "max": 100,
      "step": 1
    }
  },

  inputs: {
        count: 'number'
  },

  outputs: {
        serials: 'string[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'serialNumber',
      params: {
        count: inputs.count,
        prefix: params.prefix,
        startNumber: params.startNumber,
        digits: params.digits,
        increment: params.increment
      }
    });

    return {
      serials: result
    };
  }
};
