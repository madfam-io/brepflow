
import { NodeDefinition } from '@brepflow/types';

interface Params {
  focalLength: number;
  startParam: number;
  endParam: number;
}
interface Inputs {
  vertex?: Point;
}
interface Outputs {
  curve: Wire;
}

export const ParabolaNode: NodeDefinition<ParabolaInputs, ParabolaOutputs, ParabolaParams> = {
  type: 'Sketch::Parabola',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Parabola',
    description: 'Create a parabolic curve',
    
    
  },

  params: {
        focalLength: {
      "default": 10,
      "min": 0.1,
      "max": 10000
    },
    startParam: {
      "default": -100,
      "min": -10000,
      "max": 10000
    },
    endParam: {
      "default": 100,
      "min": -10000,
      "max": 10000
    }
  },

  inputs: {
        vertex: 'Point'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeParabola',
      params: {
        vertex: inputs.vertex,
        focalLength: params.focalLength,
        startParam: params.startParam,
        endParam: params.endParam
      }
    });

    return {
      curve: result
    };
  }
};
