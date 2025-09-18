
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  setA: Data[];
  setB: Data[];
}
interface Outputs {
  product: Data[][];
}

export const SetCartesianProductNode: NodeDefinition<SetCartesianProductInputs, SetCartesianProductOutputs, SetCartesianProductParams> = {
  type: 'Data::SetCartesianProduct',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetCartesianProduct',
    description: 'Cartesian product',
    
    
  },

  params: {
    
  },

  inputs: {
        setA: 'Data[]',
    setB: 'Data[]'
  },

  outputs: {
        product: 'Data[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setCartesian',
      params: {
        setA: inputs.setA,
        setB: inputs.setB
        
      }
    });

    return {
      product: result
    };
  }
};
