
import { NodeDefinition } from '@brepflow/types';

interface Params {
  gridU: number;
  gridV: number;
  mullionWidth: number;
  mullionDepth: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  curtainWall: Shape;
  mullions: Shape[];
  panels: Face[];
}

export const CurtainWallNode: NodeDefinition<CurtainWallInputs, CurtainWallOutputs, CurtainWallParams> = {
  type: 'Architecture::CurtainWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'CurtainWall',
    description: 'Glass curtain wall system',
    
    
  },

  params: {
        gridU: {
      "default": 1500,
      "min": 500,
      "max": 3000
    },
    gridV: {
      "default": 1500,
      "min": 500,
      "max": 3000
    },
    mullionWidth: {
      "default": 50,
      "min": 20,
      "max": 200
    },
    mullionDepth: {
      "default": 100,
      "min": 50,
      "max": 300
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        curtainWall: 'Shape',
    mullions: 'Shape[]',
    panels: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curtainWall',
      params: {
        surface: inputs.surface,
        gridU: params.gridU,
        gridV: params.gridV,
        mullionWidth: params.mullionWidth,
        mullionDepth: params.mullionDepth
      }
    });

    return {
      curtainWall: result,
      mullions: result,
      panels: result
    };
  }
};
