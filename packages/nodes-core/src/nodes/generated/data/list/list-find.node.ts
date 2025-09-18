
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  pattern: Data;
}
interface Outputs {
  items: Data[];
  indices: number[];
}

export const ListFindNode: NodeDefinition<ListFindInputs, ListFindOutputs, ListFindParams> = {
  type: 'Data::ListFind',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListFind',
    description: 'Find items matching condition',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    pattern: 'Data'
  },

  outputs: {
        items: 'Data[]',
    indices: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listFind',
      params: {
        list: inputs.list,
        pattern: inputs.pattern
        
      }
    });

    return {
      items: result,
      indices: result
    };
  }
};
