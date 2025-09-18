
import { NodeDefinition } from '@brepflow/types';

interface Params {
  baseWidth: number;
  baseDepth: number;
  height: number;
  topWidth: number;
  topDepth: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const PyramidNode: NodeDefinition<PyramidInputs, PyramidOutputs, PyramidParams> = {
  type: 'Solid::Pyramid',
  category: 'Solid',
  subcategory: 'Parametric',

  metadata: {
    label: 'Pyramid',
    description: 'Create a pyramid or truncated pyramid',
    
    
  },

  params: {
        baseWidth: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    baseDepth: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    topWidth: {
      "default": 0,
      "min": 0,
      "max": 10000,
      "description": "0 for pointed pyramid"
    },
    topDepth: {
      "default": 0,
      "min": 0,
      "max": 10000
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makePyramid',
      params: {
        
        baseWidth: params.baseWidth,
        baseDepth: params.baseDepth,
        height: params.height,
        topWidth: params.topWidth,
        topDepth: params.topDepth
      }
    });

    return {
      solid: result
    };
  }
};
