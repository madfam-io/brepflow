
import { NodeDefinition } from '@brepflow/types';

interface Params {
  slope: number;
  width: number;
  handrails: boolean;
}
interface Inputs {
  startPoint: Point;
  endPoint: Point;
}
interface Outputs {
  ramp: Shape;
  handrails: Shape[];
}

export const StraightRampNode: NodeDefinition<StraightRampInputs, StraightRampOutputs, StraightRampParams> = {
  type: 'Architecture::StraightRamp',
  category: 'Architecture',
  subcategory: 'Ramps',

  metadata: {
    label: 'StraightRamp',
    description: 'Straight access ramp',
    
    
  },

  params: {
        slope: {
      "default": 0.083,
      "min": 0.05,
      "max": 0.125
    },
    width: {
      "default": 1200,
      "min": 900,
      "max": 2000
    },
    handrails: {
      "default": true
    }
  },

  inputs: {
        startPoint: 'Point',
    endPoint: 'Point'
  },

  outputs: {
        ramp: 'Shape',
    handrails: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'straightRamp',
      params: {
        startPoint: inputs.startPoint,
        endPoint: inputs.endPoint,
        slope: params.slope,
        width: params.width,
        handrails: params.handrails
      }
    });

    return {
      ramp: result,
      handrails: result
    };
  }
};
