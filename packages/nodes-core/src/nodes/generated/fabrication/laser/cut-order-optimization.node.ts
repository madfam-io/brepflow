
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerFirst: boolean;
  minimizeTravel: boolean;
}
interface Inputs {
  paths: Wire[];
}
interface Outputs {
  orderedPaths: Wire[];
  travelPath: Wire;
}

export const CutOrderOptimizationNode: NodeDefinition<CutOrderOptimizationInputs, CutOrderOptimizationOutputs, CutOrderOptimizationParams> = {
  type: 'Fabrication::CutOrderOptimization',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'CutOrderOptimization',
    description: 'Optimize cutting order',
    
    
  },

  params: {
        innerFirst: {
      "default": true
    },
    minimizeTravel: {
      "default": true
    }
  },

  inputs: {
        paths: 'Wire[]'
  },

  outputs: {
        orderedPaths: 'Wire[]',
    travelPath: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'cutOrderOptimization',
      params: {
        paths: inputs.paths,
        innerFirst: params.innerFirst,
        minimizeTravel: params.minimizeTravel
      }
    });

    return {
      orderedPaths: result,
      travelPath: result
    };
  }
};
