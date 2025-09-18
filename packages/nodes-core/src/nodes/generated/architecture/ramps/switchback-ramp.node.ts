
import { NodeDefinition } from '@brepflow/types';

interface Params {
  runLength: number;
  landingSize: number;
}
interface Inputs {
  startPoint: Point;
  totalRise: Number;
}
interface Outputs {
  ramp: Shape;
  landings: Shape[];
}

export const SwitchbackRampNode: NodeDefinition<SwitchbackRampInputs, SwitchbackRampOutputs, SwitchbackRampParams> = {
  type: 'Architecture::SwitchbackRamp',
  category: 'Architecture',
  subcategory: 'Ramps',

  metadata: {
    label: 'SwitchbackRamp',
    description: 'Switchback accessibility ramp',
    
    
  },

  params: {
        runLength: {
      "default": 9000,
      "min": 6000,
      "max": 12000
    },
    landingSize: {
      "default": 1500,
      "min": 1500,
      "max": 2000
    }
  },

  inputs: {
        startPoint: 'Point',
    totalRise: 'Number'
  },

  outputs: {
        ramp: 'Shape',
    landings: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'switchbackRamp',
      params: {
        startPoint: inputs.startPoint,
        totalRise: inputs.totalRise,
        runLength: params.runLength,
        landingSize: params.landingSize
      }
    });

    return {
      ramp: result,
      landings: result
    };
  }
};
