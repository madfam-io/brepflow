
import { NodeDefinition } from '@brepflow/types';

interface Params {
  winderCount: number;
  turnAngle: number;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  winderStair: Shape;
}

export const WinderStairNode: NodeDefinition<WinderStairInputs, WinderStairOutputs, WinderStairParams> = {
  type: 'Architecture::WinderStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'WinderStair',
    description: 'Winder staircase',
    
    
  },

  params: {
        winderCount: {
      "default": 3,
      "min": 2,
      "max": 5,
      "step": 1
    },
    turnAngle: {
      "default": 90,
      "min": 45,
      "max": 180
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        winderStair: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'winderStair',
      params: {
        path: inputs.path,
        winderCount: params.winderCount,
        turnAngle: params.turnAngle
      }
    });

    return {
      winderStair: result
    };
  }
};
