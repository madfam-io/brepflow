
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  laplacian: ScalarField;
}

export const FieldLaplacianNode: NodeDefinition<FieldLaplacianInputs, FieldLaplacianOutputs, FieldLaplacianParams> = {
  type: 'Field::FieldLaplacian',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldLaplacian',
    description: 'Compute Laplacian',
    
    
  },

  params: {
    
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        laplacian: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldLaplacian',
      params: {
        field: inputs.field
        
      }
    });

    return {
      laplacian: result
    };
  }
};
