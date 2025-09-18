
import { NodeDefinition } from '@brepflow/types';

interface Params {
  focalLength: number;
  beamDivergence: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  focusMap: Data;
}

export const FocusCompensationNode: NodeDefinition<FocusCompensationInputs, FocusCompensationOutputs, FocusCompensationParams> = {
  type: 'Fabrication::FocusCompensation',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'FocusCompensation',
    description: 'Focus height compensation',
    
    
  },

  params: {
        focalLength: {
      "default": 50,
      "min": 20,
      "max": 200
    },
    beamDivergence: {
      "default": 2,
      "min": 0.5,
      "max": 5
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        focusMap: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'focusCompensation',
      params: {
        surface: inputs.surface,
        focalLength: params.focalLength,
        beamDivergence: params.beamDivergence
      }
    });

    return {
      focusMap: result
    };
  }
};
