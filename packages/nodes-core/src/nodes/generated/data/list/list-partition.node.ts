
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  size: number;
}
interface Outputs {
  partitions: Data[][];
}

export const ListPartitionNode: NodeDefinition<ListPartitionInputs, ListPartitionOutputs, ListPartitionParams> = {
  type: 'Data::ListPartition',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListPartition',
    description: 'Partition list into chunks',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    size: 'number'
  },

  outputs: {
        partitions: 'Data[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listPartition',
      params: {
        list: inputs.list,
        size: inputs.size
        
      }
    });

    return {
      partitions: result
    };
  }
};
