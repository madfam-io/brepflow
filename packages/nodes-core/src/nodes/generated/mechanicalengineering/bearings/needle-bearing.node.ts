
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerDiameter: number;
  outerDiameter: number;
  width: number;
  needleCount: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  bearing: Shape;
  needles: Shape[];
}

export const NeedleBearingNode: NodeDefinition<NeedleBearingInputs, NeedleBearingOutputs, NeedleBearingParams> = {
  type: 'MechanicalEngineering::NeedleBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'NeedleBearing',
    description: 'Create needle bearing',
    
    
  },

  params: {
        innerDiameter: {
      "default": 15,
      "min": 5,
      "max": 100
    },
    outerDiameter: {
      "default": 21,
      "min": 10,
      "max": 150
    },
    width: {
      "default": 12,
      "min": 5,
      "max": 50
    },
    needleCount: {
      "default": 20,
      "min": 10,
      "max": 50
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        bearing: 'Shape',
    needles: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'needleBearing',
      params: {
        center: inputs.center,
        innerDiameter: params.innerDiameter,
        outerDiameter: params.outerDiameter,
        width: params.width,
        needleCount: params.needleCount
      }
    });

    return {
      bearing: result,
      needles: result
    };
  }
};
