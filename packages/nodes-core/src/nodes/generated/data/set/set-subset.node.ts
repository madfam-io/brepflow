
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  setA: Data[];
  setB: Data[];
}
interface Outputs {
  isSubset: boolean;
}

export const SetSubsetNode: NodeDefinition<SetSubsetInputs, SetSubsetOutputs, SetSubsetParams> = {
  type: 'Data::SetSubset',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetSubset',
    description: 'Check if subset',
    
    
  },

  params: {
    
  },

  inputs: {
        setA: 'Data[]',
    setB: 'Data[]'
  },

  outputs: {
        isSubset: 'boolean'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setSubset',
      params: {
        setA: inputs.setA,
        setB: inputs.setB
        
      }
    });

    return {
      isSubset: result
    };
  }
};
