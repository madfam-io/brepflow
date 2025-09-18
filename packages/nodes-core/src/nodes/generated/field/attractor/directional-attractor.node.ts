
import { NodeDefinition } from '@brepflow/types';

interface Params {
  direction: [number, number, number];
  strength: number;
  spread: number;
}
interface Inputs {
  origin: Point;
}
interface Outputs {
  field: VectorField;
}

export const DirectionalAttractorNode: NodeDefinition<DirectionalAttractorInputs, DirectionalAttractorOutputs, DirectionalAttractorParams> = {
  type: 'Field::DirectionalAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'DirectionalAttractor',
    description: 'Directional attractor',
    
    
  },

  params: {
        direction: {
      "default": [
        1,
        0,
        0
      ]
    },
    strength: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    spread: {
      "default": 45,
      "min": 0,
      "max": 180
    }
  },

  inputs: {
        origin: 'Point'
  },

  outputs: {
        field: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorDirectional',
      params: {
        origin: inputs.origin,
        direction: params.direction,
        strength: params.strength,
        spread: params.spread
      }
    });

    return {
      field: result
    };
  }
};
