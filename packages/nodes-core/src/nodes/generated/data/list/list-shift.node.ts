
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wrap: boolean;
}
interface Inputs {
  list: Data[];
  offset: number;
}
interface Outputs {
  shifted: Data[];
}

export const ListShiftNode: NodeDefinition<ListShiftInputs, ListShiftOutputs, ListShiftParams> = {
  type: 'Data::ListShift',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListShift',
    description: 'Shift list items',
    
    
  },

  params: {
        wrap: {
      "default": true
    }
  },

  inputs: {
        list: 'Data[]',
    offset: 'number'
  },

  outputs: {
        shifted: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listShift',
      params: {
        list: inputs.list,
        offset: inputs.offset,
        wrap: params.wrap
      }
    });

    return {
      shifted: result
    };
  }
};
