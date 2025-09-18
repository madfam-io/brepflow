
import { NodeDefinition } from '@brepflow/types';

interface Params {
  deformationType: string;
  steps: number;
}
interface Inputs {
  baseTile: Face;
}
interface Outputs {
  deformation: Face[];
}

export const ParquetDeformationNode: NodeDefinition<ParquetDeformationInputs, ParquetDeformationOutputs, ParquetDeformationParams> = {
  type: 'Patterns::ParquetDeformation',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'ParquetDeformation',
    description: 'M.C. Escher deformation',
    
    
  },

  params: {
        deformationType: {
      "default": "radial",
      "options": [
        "linear",
        "radial",
        "spiral"
      ]
    },
    steps: {
      "default": 10,
      "min": 3,
      "max": 50,
      "step": 1
    }
  },

  inputs: {
        baseTile: 'Face'
  },

  outputs: {
        deformation: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'parquetDeformation',
      params: {
        baseTile: inputs.baseTile,
        deformationType: params.deformationType,
        steps: params.steps
      }
    });

    return {
      deformation: result
    };
  }
};
