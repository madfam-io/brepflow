
import { NodeDefinition } from '@brepflow/types';

interface Params {
  scale: number;
  density: number;
  showNormals: boolean;
  colorCode: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  comb: Shape;
  maxCurvature: number;
  minCurvature: number;
  curvatureValues: number[];
}

export const CurvatureCombNode: NodeDefinition<CurvatureCombInputs, CurvatureCombOutputs, CurvatureCombParams> = {
  type: 'Analysis::CurvatureComb',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurvatureComb',
    description: 'Analyze curve curvature with visual comb',
    
    
  },

  params: {
        scale: {
      "default": 1,
      "min": 0.1,
      "max": 10,
      "description": "Comb scale factor"
    },
    density: {
      "default": 50,
      "min": 10,
      "max": 200,
      "description": "Number of samples"
    },
    showNormals: {
      "default": true
    },
    colorCode: {
      "default": false,
      "description": "Color by curvature value"
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        comb: 'Shape',
    maxCurvature: 'number',
    minCurvature: 'number',
    curvatureValues: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curvatureComb',
      params: {
        curve: inputs.curve,
        scale: params.scale,
        density: params.density,
        showNormals: params.showNormals,
        colorCode: params.colorCode
      }
    });

    return {
      comb: result,
      maxCurvature: result,
      minCurvature: result,
      curvatureValues: result
    };
  }
};
