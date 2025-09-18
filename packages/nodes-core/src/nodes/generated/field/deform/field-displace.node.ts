
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
}
interface Inputs {
  surface: Face;
  field: ScalarField;
}
interface Outputs {
  displaced: Face;
}

export const FieldDisplaceNode: NodeDefinition<FieldDisplaceInputs, FieldDisplaceOutputs, FieldDisplaceParams> = {
  type: 'Field::FieldDisplace',
  category: 'Field',
  subcategory: 'Deform',

  metadata: {
    label: 'FieldDisplace',
    description: 'Displace along normals',
    
    
  },

  params: {
        strength: {
      "default": 10,
      "min": -100,
      "max": 100
    }
  },

  inputs: {
        surface: 'Face',
    field: 'ScalarField'
  },

  outputs: {
        displaced: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldDisplace',
      params: {
        surface: inputs.surface,
        field: inputs.field,
        strength: params.strength
      }
    });

    return {
      displaced: result
    };
  }
};
