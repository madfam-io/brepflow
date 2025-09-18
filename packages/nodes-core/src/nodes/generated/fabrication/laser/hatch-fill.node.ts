
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
  spacing: number;
  crosshatch: boolean;
}
interface Inputs {
  region: Face;
}
interface Outputs {
  hatchLines: Wire[];
}

export const HatchFillNode: NodeDefinition<HatchFillInputs, HatchFillOutputs, HatchFillParams> = {
  type: 'Fabrication::HatchFill',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'HatchFill',
    description: 'Generate hatch fill pattern',
    
    
  },

  params: {
        angle: {
      "default": 45,
      "min": 0,
      "max": 180
    },
    spacing: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    crosshatch: {
      "default": false
    }
  },

  inputs: {
        region: 'Face'
  },

  outputs: {
        hatchLines: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'hatchFill',
      params: {
        region: inputs.region,
        angle: params.angle,
        spacing: params.spacing,
        crosshatch: params.crosshatch
      }
    });

    return {
      hatchLines: result
    };
  }
};
