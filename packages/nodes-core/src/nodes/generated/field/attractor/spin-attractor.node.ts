
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
  radius: number;
  axis: [number, number, number];
  decay: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  field: VectorField;
}

export const SpinAttractorNode: NodeDefinition<SpinAttractorInputs, SpinAttractorOutputs, SpinAttractorParams> = {
  type: 'Field::SpinAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'SpinAttractor',
    description: 'Spinning attractor field',
    
    
  },

  params: {
        strength: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    radius: {
      "default": 100,
      "min": 0.1
    },
    axis: {
      "default": [
        0,
        0,
        1
      ]
    },
    decay: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        field: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorSpin',
      params: {
        center: inputs.center,
        strength: params.strength,
        radius: params.radius,
        axis: params.axis,
        decay: params.decay
      }
    });

    return {
      field: result
    };
  }
};
