
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerRadius: number;
  outerRadius: number;
  totalRise: number;
}
interface Inputs {
  centerPoint: Point;
}
interface Outputs {
  helicalStair: Shape;
}

export const HelicalStairNode: NodeDefinition<HelicalStairInputs, HelicalStairOutputs, HelicalStairParams> = {
  type: 'Architecture::HelicalStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'HelicalStair',
    description: 'Helical staircase',
    
    
  },

  params: {
        innerRadius: {
      "default": 500,
      "min": 0,
      "max": 1000
    },
    outerRadius: {
      "default": 1500,
      "min": 1000,
      "max": 3000
    },
    totalRise: {
      "default": 3000,
      "min": 1000,
      "max": 6000
    }
  },

  inputs: {
        centerPoint: 'Point'
  },

  outputs: {
        helicalStair: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'helicalStair',
      params: {
        centerPoint: inputs.centerPoint,
        innerRadius: params.innerRadius,
        outerRadius: params.outerRadius,
        totalRise: params.totalRise
      }
    });

    return {
      helicalStair: result
    };
  }
};
