
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  setA: Data[];
  setB: Data[];
}
interface Outputs {
  difference: Data[];
}

export const SetDifferenceNode: NodeDefinition<SetDifferenceInputs, SetDifferenceOutputs, SetDifferenceParams> = {
  type: 'Data::SetDifference',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetDifference',
    description: 'Difference of sets',
    
    
  },

  params: {
    
  },

  inputs: {
        setA: 'Data[]',
    setB: 'Data[]'
  },

  outputs: {
        difference: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setDifference',
      params: {
        setA: inputs.setA,
        setB: inputs.setB
        
      }
    });

    return {
      difference: result
    };
  }
};
