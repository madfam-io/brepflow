
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ironingSpeed: number;
  flowRate: number;
}
interface Inputs {
  topSurfaces: Face[];
}
interface Outputs {
  ironingPaths: Wire[];
}

export const IroningPassNode: NodeDefinition<IroningPassInputs, IroningPassOutputs, IroningPassParams> = {
  type: 'Fabrication::IroningPass',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'IroningPass',
    description: 'Generate ironing passes',
    
    
  },

  params: {
        ironingSpeed: {
      "default": 20,
      "min": 5,
      "max": 50
    },
    flowRate: {
      "default": 0.1,
      "min": 0,
      "max": 0.3
    }
  },

  inputs: {
        topSurfaces: 'Face[]'
  },

  outputs: {
        ironingPaths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'ironingPass',
      params: {
        topSurfaces: inputs.topSurfaces,
        ironingSpeed: params.ironingSpeed,
        flowRate: params.flowRate
      }
    });

    return {
      ironingPaths: result
    };
  }
};
