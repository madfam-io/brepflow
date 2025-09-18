
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  field: VectorField;
}
interface Outputs {
  divergence: ScalarField;
}

export const FieldDivergenceNode: NodeDefinition<FieldDivergenceInputs, FieldDivergenceOutputs, FieldDivergenceParams> = {
  type: 'Field::FieldDivergence',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldDivergence',
    description: 'Compute divergence',
    
    
  },

  params: {
    
  },

  inputs: {
        field: 'VectorField'
  },

  outputs: {
        divergence: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldDivergence',
      params: {
        field: inputs.field
        
      }
    });

    return {
      divergence: result
    };
  }
};
