
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  setA: Data[];
  setB: Data[];
}
interface Outputs {
  union: Data[];
}

export const SetUnionNode: NodeDefinition<SetUnionInputs, SetUnionOutputs, SetUnionParams> = {
  type: 'Data::SetUnion',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetUnion',
    description: 'Union of sets',
    
    
  },

  params: {
    
  },

  inputs: {
        setA: 'Data[]',
    setB: 'Data[]'
  },

  outputs: {
        union: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setUnion',
      params: {
        setA: inputs.setA,
        setB: inputs.setB
        
      }
    });

    return {
      union: result
    };
  }
};
