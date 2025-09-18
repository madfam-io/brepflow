
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  field: VectorField;
}
interface Outputs {
  curl: VectorField;
}

export const FieldCurlNode: NodeDefinition<FieldCurlInputs, FieldCurlOutputs, FieldCurlParams> = {
  type: 'Field::FieldCurl',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldCurl',
    description: 'Compute curl',
    
    
  },

  params: {
    
  },

  inputs: {
        field: 'VectorField'
  },

  outputs: {
        curl: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldCurl',
      params: {
        field: inputs.field
        
      }
    });

    return {
      curl: result
    };
  }
};
