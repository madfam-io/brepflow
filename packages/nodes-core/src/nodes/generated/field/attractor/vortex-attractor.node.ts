
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
  radius: number;
  coreRadius: number;
  height: number;
}
interface Inputs {
  axis: Line;
}
interface Outputs {
  field: VectorField;
}

export const VortexAttractorNode: NodeDefinition<VortexAttractorInputs, VortexAttractorOutputs, VortexAttractorParams> = {
  type: 'Field::VortexAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'VortexAttractor',
    description: 'Vortex attractor field',
    
    
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
    coreRadius: {
      "default": 10,
      "min": 0.1
    },
    height: {
      "default": 200,
      "min": 0.1
    }
  },

  inputs: {
        axis: 'Line'
  },

  outputs: {
        field: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorVortex',
      params: {
        axis: inputs.axis,
        strength: params.strength,
        radius: params.radius,
        coreRadius: params.coreRadius,
        height: params.height
      }
    });

    return {
      field: result
    };
  }
};
