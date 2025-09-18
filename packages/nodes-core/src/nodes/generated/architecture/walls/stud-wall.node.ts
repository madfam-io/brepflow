
import { NodeDefinition } from '@brepflow/types';

interface Params {
  studSpacing: number;
  studWidth: number;
  studDepth: number;
}
interface Inputs {
  outline: Wire;
}
interface Outputs {
  studFrame: Shape[];
}

export const StudWallNode: NodeDefinition<StudWallInputs, StudWallOutputs, StudWallParams> = {
  type: 'Architecture::StudWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'StudWall',
    description: 'Framed stud wall',
    
    
  },

  params: {
        studSpacing: {
      "default": 400,
      "min": 300,
      "max": 600
    },
    studWidth: {
      "default": 90,
      "min": 50,
      "max": 200
    },
    studDepth: {
      "default": 45,
      "min": 35,
      "max": 100
    }
  },

  inputs: {
        outline: 'Wire'
  },

  outputs: {
        studFrame: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'studWall',
      params: {
        outline: inputs.outline,
        studSpacing: params.studSpacing,
        studWidth: params.studWidth,
        studDepth: params.studDepth
      }
    });

    return {
      studFrame: result
    };
  }
};
