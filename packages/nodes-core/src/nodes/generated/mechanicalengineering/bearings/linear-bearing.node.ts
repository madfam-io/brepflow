
import { NodeDefinition } from '@brepflow/types';

interface Params {
  shaftDiameter: number;
  outerDiameter: number;
  length: number;
  type: string;
}
interface Inputs {
  center: Point;
  axis?: Vector;
}
interface Outputs {
  bearing: Shape;
  bore: Wire;
}

export const LinearBearingNode: NodeDefinition<LinearBearingInputs, LinearBearingOutputs, LinearBearingParams> = {
  type: 'MechanicalEngineering::LinearBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'LinearBearing',
    description: 'Create linear motion bearing',
    
    
  },

  params: {
        shaftDiameter: {
      "default": 8,
      "min": 3,
      "max": 50
    },
    outerDiameter: {
      "default": 15,
      "min": 8,
      "max": 80
    },
    length: {
      "default": 24,
      "min": 10,
      "max": 100
    },
    type: {
      "default": "ball",
      "options": [
        "ball",
        "plain",
        "roller"
      ]
    }
  },

  inputs: {
        center: 'Point',
    axis: 'Vector'
  },

  outputs: {
        bearing: 'Shape',
    bore: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'linearBearing',
      params: {
        center: inputs.center,
        axis: inputs.axis,
        shaftDiameter: params.shaftDiameter,
        outerDiameter: params.outerDiameter,
        length: params.length,
        type: params.type
      }
    });

    return {
      bearing: result,
      bore: result
    };
  }
};
