
import { NodeDefinition } from '@brepflow/types';

interface Params {
  preferCorners: boolean;
  minEdgeDistance: number;
}
interface Inputs {
  closedPaths: Wire[];
}
interface Outputs {
  piercePoints: Point[];
}

export const PierceOptimizationNode: NodeDefinition<PierceOptimizationInputs, PierceOptimizationOutputs, PierceOptimizationParams> = {
  type: 'Fabrication::PierceOptimization',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'PierceOptimization',
    description: 'Optimize pierce points',
    
    
  },

  params: {
        preferCorners: {
      "default": true
    },
    minEdgeDistance: {
      "default": 2,
      "min": 0,
      "max": 10
    }
  },

  inputs: {
        closedPaths: 'Wire[]'
  },

  outputs: {
        piercePoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'pierceOptimization',
      params: {
        closedPaths: inputs.closedPaths,
        preferCorners: params.preferCorners,
        minEdgeDistance: params.minEdgeDistance
      }
    });

    return {
      piercePoints: result
    };
  }
};
