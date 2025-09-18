
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  pitch: number;
  width: number;
}
interface Inputs {
  centerPoint: Point;
  levels: Number;
}
interface Outputs {
  helicalRamp: Shape;
}

export const HelicalRampNode: NodeDefinition<HelicalRampInputs, HelicalRampOutputs, HelicalRampParams> = {
  type: 'Architecture::HelicalRamp',
  category: 'Architecture',
  subcategory: 'Ramps',

  metadata: {
    label: 'HelicalRamp',
    description: 'Helical parking ramp',
    
    
  },

  params: {
        radius: {
      "default": 15000,
      "min": 10000,
      "max": 25000
    },
    pitch: {
      "default": 3000,
      "min": 2500,
      "max": 4000
    },
    width: {
      "default": 7000,
      "min": 5500,
      "max": 9000
    }
  },

  inputs: {
        centerPoint: 'Point',
    levels: 'Number'
  },

  outputs: {
        helicalRamp: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'helicalRamp',
      params: {
        centerPoint: inputs.centerPoint,
        levels: inputs.levels,
        radius: params.radius,
        pitch: params.pitch,
        width: params.width
      }
    });

    return {
      helicalRamp: result
    };
  }
};
