
import { NodeDefinition } from '@brepflow/types';

interface Params {
  coastVolume: number;
  minVolume: number;
}
interface Inputs {
  extrusions: Wire[];
}
interface Outputs {
  coastingPoints: Point[];
}

export const CoastingSetupNode: NodeDefinition<CoastingSetupInputs, CoastingSetupOutputs, CoastingSetupParams> = {
  type: 'Fabrication::CoastingSetup',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'CoastingSetup',
    description: 'Setup coasting parameters',
    
    
  },

  params: {
        coastVolume: {
      "default": 0.064,
      "min": 0,
      "max": 1
    },
    minVolume: {
      "default": 0.8,
      "min": 0.1,
      "max": 5
    }
  },

  inputs: {
        extrusions: 'Wire[]'
  },

  outputs: {
        coastingPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'coastingSetup',
      params: {
        extrusions: inputs.extrusions,
        coastVolume: params.coastVolume,
        minVolume: params.minVolume
      }
    });

    return {
      coastingPoints: result
    };
  }
};
