
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
  treadWidth: number;
}
interface Inputs {
  startPoint: Point;
  totalRise: Number;
}
interface Outputs {
  alternatingStair: Shape;
}

export const AlternatingTreadStairNode: NodeDefinition<AlternatingTreadStairInputs, AlternatingTreadStairOutputs, AlternatingTreadStairParams> = {
  type: 'Architecture::AlternatingTreadStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'AlternatingTreadStair',
    description: 'Alternating tread device',
    
    
  },

  params: {
        angle: {
      "default": 56,
      "min": 50,
      "max": 70
    },
    treadWidth: {
      "default": 600,
      "min": 500,
      "max": 700
    }
  },

  inputs: {
        startPoint: 'Point',
    totalRise: 'Number'
  },

  outputs: {
        alternatingStair: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'alternatingTreadStair',
      params: {
        startPoint: inputs.startPoint,
        totalRise: inputs.totalRise,
        angle: params.angle,
        treadWidth: params.treadWidth
      }
    });

    return {
      alternatingStair: result
    };
  }
};
