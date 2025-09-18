
import { NodeDefinition } from '@brepflow/types';

interface Params {
  maxDistance: number;
  inside: boolean;
  signed: boolean;
}
interface Inputs {
  geometry: Shape;
}
interface Outputs {
  field: ScalarField;
}

export const DistanceFieldNode: NodeDefinition<DistanceFieldInputs, DistanceFieldOutputs, DistanceFieldParams> = {
  type: 'Field::DistanceField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'DistanceField',
    description: 'Distance field from geometry',
    
    
  },

  params: {
        maxDistance: {
      "default": 100,
      "min": 0.1
    },
    inside: {
      "default": false
    },
    signed: {
      "default": true
    }
  },

  inputs: {
        geometry: 'Shape'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldDistance',
      params: {
        geometry: inputs.geometry,
        maxDistance: params.maxDistance,
        inside: params.inside,
        signed: params.signed
      }
    });

    return {
      field: result
    };
  }
};
