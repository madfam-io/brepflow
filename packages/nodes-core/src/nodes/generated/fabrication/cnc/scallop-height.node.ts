
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ballRadius: number;
  stepover: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  scallopMap: Data;
  maxScallop: Number;
}

export const ScallopHeightNode: NodeDefinition<ScallopHeightInputs, ScallopHeightOutputs, ScallopHeightParams> = {
  type: 'Fabrication::ScallopHeight',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ScallopHeight',
    description: 'Calculate scallop height',
    
    
  },

  params: {
        ballRadius: {
      "default": 3,
      "min": 0.5,
      "max": 25
    },
    stepover: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        scallopMap: 'Data',
    maxScallop: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'scallopHeight',
      params: {
        surface: inputs.surface,
        ballRadius: params.ballRadius,
        stepover: params.stepover
      }
    });

    return {
      scallopMap: result,
      maxScallop: result
    };
  }
};
