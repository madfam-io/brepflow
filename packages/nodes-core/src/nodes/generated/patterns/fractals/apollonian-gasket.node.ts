
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
  minRadius: number;
}
interface Inputs {
  outerCircle: Wire;
}
interface Outputs {
  circles: Wire[];
}

export const ApollonianGasketNode: NodeDefinition<ApollonianGasketInputs, ApollonianGasketOutputs, ApollonianGasketParams> = {
  type: 'Patterns::ApollonianGasket',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'ApollonianGasket',
    description: 'Apollonian gasket circles',
    
    
  },

  params: {
        depth: {
      "default": 5,
      "min": 1,
      "max": 10,
      "step": 1
    },
    minRadius: {
      "default": 0.1,
      "min": 0.01
    }
  },

  inputs: {
        outerCircle: 'Wire'
  },

  outputs: {
        circles: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'apollonianGasket',
      params: {
        outerCircle: inputs.outerCircle,
        depth: params.depth,
        minRadius: params.minRadius
      }
    });

    return {
      circles: result
    };
  }
};
