
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  setA: Data[];
  setB: Data[];
}
interface Outputs {
  difference: Data[];
}

export const SetSymmetricDifferenceNode: NodeDefinition<SetSymmetricDifferenceInputs, SetSymmetricDifferenceOutputs, SetSymmetricDifferenceParams> = {
  type: 'Data::SetSymmetricDifference',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetSymmetricDifference',
    description: 'Symmetric difference',
    
    
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
      type: 'setSymmetricDifference',
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
