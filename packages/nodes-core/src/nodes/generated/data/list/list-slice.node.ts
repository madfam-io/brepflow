
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  start: number;
  end?: number;
}
interface Outputs {
  sublist: Data[];
}

export const ListSliceNode: NodeDefinition<ListSliceInputs, ListSliceOutputs, ListSliceParams> = {
  type: 'Data::ListSlice',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListSlice',
    description: 'Extract sublist',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    start: 'number',
    end: 'number'
  },

  outputs: {
        sublist: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listSlice',
      params: {
        list: inputs.list,
        start: inputs.start,
        end: inputs.end
        
      }
    });

    return {
      sublist: result
    };
  }
};
