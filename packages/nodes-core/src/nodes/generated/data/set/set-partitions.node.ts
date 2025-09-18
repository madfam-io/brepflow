
import { NodeDefinition } from '@brepflow/types';

interface Params {
  k: number;
}
interface Inputs {
  set: Data[];
}
interface Outputs {
  partitions: Data[][][];
}

export const SetPartitionsNode: NodeDefinition<SetPartitionsInputs, SetPartitionsOutputs, SetPartitionsParams> = {
  type: 'Data::SetPartitions',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetPartitions',
    description: 'Set partitions',
    
    
  },

  params: {
        k: {
      "default": 2,
      "min": 2,
      "max": 10
    }
  },

  inputs: {
        set: 'Data[]'
  },

  outputs: {
        partitions: 'Data[][][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setPartitions',
      params: {
        set: inputs.set,
        k: params.k
      }
    });

    return {
      partitions: result
    };
  }
};
