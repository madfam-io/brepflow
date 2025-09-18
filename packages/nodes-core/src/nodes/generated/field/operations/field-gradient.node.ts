
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  gradient: VectorField;
}

export const FieldGradientNode: NodeDefinition<FieldGradientInputs, FieldGradientOutputs, FieldGradientParams> = {
  type: 'Field::FieldGradient',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldGradient',
    description: 'Compute field gradient',
    
    
  },

  params: {
    
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        gradient: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldGradient',
      params: {
        field: inputs.field
        
      }
    });

    return {
      gradient: result
    };
  }
};
