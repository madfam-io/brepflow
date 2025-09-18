
import { NodeDefinition } from '@brepflow/types';

interface Params {
  kerf: number;
  cornerRadius: number;
}
interface Inputs {
  profiles: Wire[];
}
interface Outputs {
  cuttingPath: Wire[];
}

export const LaserPathNode: NodeDefinition<LaserPathInputs, LaserPathOutputs, LaserPathParams> = {
  type: 'Fabrication::LaserPath',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'LaserPath',
    description: 'Generate laser cutting path',
    
    
  },

  params: {
        kerf: {
      "default": 0.15,
      "min": 0,
      "max": 1
    },
    cornerRadius: {
      "default": 0,
      "min": 0,
      "max": 5
    }
  },

  inputs: {
        profiles: 'Wire[]'
  },

  outputs: {
        cuttingPath: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'laserPath',
      params: {
        profiles: inputs.profiles,
        kerf: params.kerf,
        cornerRadius: params.cornerRadius
      }
    });

    return {
      cuttingPath: result
    };
  }
};
