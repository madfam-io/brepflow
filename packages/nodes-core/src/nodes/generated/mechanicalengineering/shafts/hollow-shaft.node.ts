
import { NodeDefinition } from '@brepflow/types';

interface Params {
  outerDiameter: number;
  innerDiameter: number;
  length: number;
  endMachining: string;
}
interface Inputs {
  center: Point;
  axis?: Vector;
}
interface Outputs {
  shaft: Shape;
  bore: Wire;
}

export const HollowShaftNode: NodeDefinition<HollowShaftInputs, HollowShaftOutputs, HollowShaftParams> = {
  type: 'MechanicalEngineering::HollowShaft',
  category: 'MechanicalEngineering',
  subcategory: 'Shafts',

  metadata: {
    label: 'HollowShaft',
    description: 'Create hollow shaft',
    
    
  },

  params: {
        outerDiameter: {
      "default": 40,
      "min": 10,
      "max": 200
    },
    innerDiameter: {
      "default": 30,
      "min": 5,
      "max": 190
    },
    length: {
      "default": 100,
      "min": 20,
      "max": 500
    },
    endMachining: {
      "default": "none",
      "options": [
        "none",
        "threads",
        "splines"
      ]
    }
  },

  inputs: {
        center: 'Point',
    axis: 'Vector'
  },

  outputs: {
        shaft: 'Shape',
    bore: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'hollowShaft',
      params: {
        center: inputs.center,
        axis: inputs.axis,
        outerDiameter: params.outerDiameter,
        innerDiameter: params.innerDiameter,
        length: params.length,
        endMachining: params.endMachining
      }
    });

    return {
      shaft: result,
      bore: result
    };
  }
};
