
import { NodeDefinition } from '@brepflow/types';

interface Params {
  moduleSize: number;
  irrigationType: string;
}
interface Inputs {
  wallSurface: Face;
}
interface Outputs {
  greenWall: Shape;
  modules: Shape[];
}

export const GreenWallNode: NodeDefinition<GreenWallInputs, GreenWallOutputs, GreenWallParams> = {
  type: 'Architecture::GreenWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'GreenWall',
    description: 'Living green wall system',
    
    
  },

  params: {
        moduleSize: {
      "default": 600,
      "min": 300,
      "max": 1200
    },
    irrigationType: {
      "default": "drip",
      "options": [
        "drip",
        "hydroponic",
        "aeroponic"
      ]
    }
  },

  inputs: {
        wallSurface: 'Face'
  },

  outputs: {
        greenWall: 'Shape',
    modules: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'greenWall',
      params: {
        wallSurface: inputs.wallSurface,
        moduleSize: params.moduleSize,
        irrigationType: params.irrigationType
      }
    });

    return {
      greenWall: result,
      modules: result
    };
  }
};
