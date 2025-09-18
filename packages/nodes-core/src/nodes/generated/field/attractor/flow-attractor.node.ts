
import { NodeDefinition } from '@brepflow/types';

interface Params {
  velocity: number;
  turbulence: number;
  viscosity: number;
}
interface Inputs {
  obstacles?: Shape[];
  sources?: Point[];
}
interface Outputs {
  field: VectorField;
}

export const FlowAttractorNode: NodeDefinition<FlowAttractorInputs, FlowAttractorOutputs, FlowAttractorParams> = {
  type: 'Field::FlowAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'FlowAttractor',
    description: 'Flow field attractor',
    
    
  },

  params: {
        velocity: {
      "default": 10,
      "min": 0
    },
    turbulence: {
      "default": 0.1,
      "min": 0,
      "max": 1
    },
    viscosity: {
      "default": 0.1,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        obstacles: 'Shape[]',
    sources: 'Point[]'
  },

  outputs: {
        field: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorFlow',
      params: {
        obstacles: inputs.obstacles,
        sources: inputs.sources,
        velocity: params.velocity,
        turbulence: params.turbulence,
        viscosity: params.viscosity
      }
    });

    return {
      field: result
    };
  }
};
