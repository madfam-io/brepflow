
import { NodeDefinition } from '@brepflow/types';

interface Params {
  retractionDistance: number;
  minTravelDistance: number;
}
interface Inputs {
  toolpath: Wire[];
}
interface Outputs {
  retractionPoints: Point[];
}

export const RetractionOptimizationNode: NodeDefinition<RetractionOptimizationInputs, RetractionOptimizationOutputs, RetractionOptimizationParams> = {
  type: 'Fabrication::RetractionOptimization',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'RetractionOptimization',
    description: 'Optimize retraction points',
    
    
  },

  params: {
        retractionDistance: {
      "default": 1,
      "min": 0,
      "max": 10
    },
    minTravelDistance: {
      "default": 2,
      "min": 0.5,
      "max": 10
    }
  },

  inputs: {
        toolpath: 'Wire[]'
  },

  outputs: {
        retractionPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'retractionOptimization',
      params: {
        toolpath: inputs.toolpath,
        retractionDistance: params.retractionDistance,
        minTravelDistance: params.minTravelDistance
      }
    });

    return {
      retractionPoints: result
    };
  }
};
