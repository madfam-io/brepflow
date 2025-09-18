
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  flareSlope: number;
}
interface Inputs {
  curbLine: Wire;
}
interface Outputs {
  curbRamp: Shape;
}

export const CurbRampNode: NodeDefinition<CurbRampInputs, CurbRampOutputs, CurbRampParams> = {
  type: 'Architecture::CurbRamp',
  category: 'Architecture',
  subcategory: 'Ramps',

  metadata: {
    label: 'CurbRamp',
    description: 'Curb cut ramp',
    
    
  },

  params: {
        type: {
      "default": "perpendicular",
      "options": [
        "perpendicular",
        "parallel",
        "combination"
      ]
    },
    flareSlope: {
      "default": 0.1,
      "min": 0.083,
      "max": 0.125
    }
  },

  inputs: {
        curbLine: 'Wire'
  },

  outputs: {
        curbRamp: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curbRamp',
      params: {
        curbLine: inputs.curbLine,
        type: params.type,
        flareSlope: params.flareSlope
      }
    });

    return {
      curbRamp: result
    };
  }
};
