
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minDensity: number;
  maxDensity: number;
  gradientDistance: number;
}
interface Inputs {
  model: Shape;
  stressMap?: Data;
}
interface Outputs {
  adaptiveInfill: Wire[];
}

export const InfillOptimizationNode: NodeDefinition<InfillOptimizationInputs, InfillOptimizationOutputs, InfillOptimizationParams> = {
  type: 'Fabrication::InfillOptimization',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'InfillOptimization',
    description: 'Adaptive infill generation',
    
    
  },

  params: {
        minDensity: {
      "default": 0.1,
      "min": 0,
      "max": 1
    },
    maxDensity: {
      "default": 0.5,
      "min": 0,
      "max": 1
    },
    gradientDistance: {
      "default": 5,
      "min": 1,
      "max": 20
    }
  },

  inputs: {
        model: 'Shape',
    stressMap: 'Data'
  },

  outputs: {
        adaptiveInfill: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'infillOptimization',
      params: {
        model: inputs.model,
        stressMap: inputs.stressMap,
        minDensity: params.minDensity,
        maxDensity: params.maxDensity,
        gradientDistance: params.gradientDistance
      }
    });

    return {
      adaptiveInfill: result
    };
  }
};
