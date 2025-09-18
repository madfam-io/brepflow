
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
}
interface Inputs {
  list: Data[];
}
interface Outputs {
  flattened: Data[];
}

export const ListFlattenNode: NodeDefinition<ListFlattenInputs, ListFlattenOutputs, ListFlattenParams> = {
  type: 'Data::ListFlatten',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListFlatten',
    description: 'Flatten nested lists',
    
    
  },

  params: {
        depth: {
      "default": 1,
      "min": 1,
      "max": 10
    }
  },

  inputs: {
        list: 'Data[]'
  },

  outputs: {
        flattened: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listFlatten',
      params: {
        list: inputs.list,
        depth: params.depth
      }
    });

    return {
      flattened: result
    };
  }
};
