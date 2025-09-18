
import { NodeDefinition } from '@brepflow/types';

interface Params {
  spacing: number;
  rotations: boolean;
  grainDirection: boolean;
}
interface Inputs {
  parts: Face[];
  sheet: Face;
}
interface Outputs {
  nestedParts: Face[];
  utilization: Number;
}

export const NestingOptimizationNode: NodeDefinition<NestingOptimizationInputs, NestingOptimizationOutputs, NestingOptimizationParams> = {
  type: 'Fabrication::NestingOptimization',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'NestingOptimization',
    description: 'Optimize material nesting',
    
    
  },

  params: {
        spacing: {
      "default": 2,
      "min": 0,
      "max": 10
    },
    rotations: {
      "default": true
    },
    grainDirection: {
      "default": false
    }
  },

  inputs: {
        parts: 'Face[]',
    sheet: 'Face'
  },

  outputs: {
        nestedParts: 'Face[]',
    utilization: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'nestingOptimization',
      params: {
        parts: inputs.parts,
        sheet: inputs.sheet,
        spacing: params.spacing,
        rotations: params.rotations,
        grainDirection: params.grainDirection
      }
    });

    return {
      nestedParts: result,
      utilization: result
    };
  }
};
