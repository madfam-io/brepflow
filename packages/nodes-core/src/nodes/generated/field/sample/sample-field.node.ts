
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  field: ScalarField;
  points: Point[];
}
interface Outputs {
  values: number[];
}

export const SampleFieldNode: NodeDefinition<SampleFieldInputs, SampleFieldOutputs, SampleFieldParams> = {
  type: 'Field::SampleField',
  category: 'Field',
  subcategory: 'Sample',

  metadata: {
    label: 'SampleField',
    description: 'Sample field at points',
    
    
  },

  params: {
    
  },

  inputs: {
        field: 'ScalarField',
    points: 'Point[]'
  },

  outputs: {
        values: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldSample',
      params: {
        field: inputs.field,
        points: inputs.points
        
      }
    });

    return {
      values: result
    };
  }
};
