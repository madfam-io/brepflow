
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  product: number;
}

export const ProductNode: NodeDefinition<ProductInputs, ProductOutputs, ProductParams> = {
  type: 'Math::Product',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Product',
    description: 'Product of values',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        product: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathProduct',
      params: {
        values: inputs.values
        
      }
    });

    return {
      product: result
    };
  }
};
