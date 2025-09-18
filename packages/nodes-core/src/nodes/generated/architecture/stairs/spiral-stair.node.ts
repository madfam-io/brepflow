
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  totalRise: number;
  rotation: number;
  centerPole: boolean;
}
interface Inputs {
  centerPoint: Point;
}
interface Outputs {
  spiralStair: Shape;
  centerPole: Shape;
}

export const SpiralStairNode: NodeDefinition<SpiralStairInputs, SpiralStairOutputs, SpiralStairParams> = {
  type: 'Architecture::SpiralStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'SpiralStair',
    description: 'Spiral staircase',
    
    
  },

  params: {
        diameter: {
      "default": 2000,
      "min": 1200,
      "max": 3000
    },
    totalRise: {
      "default": 3000,
      "min": 1000,
      "max": 6000
    },
    rotation: {
      "default": 360,
      "min": 270,
      "max": 720
    },
    centerPole: {
      "default": true
    }
  },

  inputs: {
        centerPoint: 'Point'
  },

  outputs: {
        spiralStair: 'Shape',
    centerPole: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'spiralStair',
      params: {
        centerPoint: inputs.centerPoint,
        diameter: params.diameter,
        totalRise: params.totalRise,
        rotation: params.rotation,
        centerPole: params.centerPole
      }
    });

    return {
      spiralStair: result,
      centerPole: result
    };
  }
};
