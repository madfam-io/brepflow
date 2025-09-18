
import { NodeDefinition } from '@brepflow/types';

interface Params {
  continuityStart: string;
  continuityEnd: string;
  bulge: number;
}
interface Inputs {
  curve1: Wire;
  curve2: Wire;
  point1?: Point;
  point2?: Point;
}
interface Outputs {
  blendCurve: Wire;
}

export const BlendCurveNode: NodeDefinition<BlendCurveInputs, BlendCurveOutputs, BlendCurveParams> = {
  type: 'Surface::BlendCurve',
  category: 'Surface',
  subcategory: 'Curves',

  metadata: {
    label: 'BlendCurve',
    description: 'Blend between two curves',
    
    
  },

  params: {
        continuityStart: {
      "default": "G1",
      "options": [
        "G0",
        "G1",
        "G2",
        "G3"
      ]
    },
    continuityEnd: {
      "default": "G1",
      "options": [
        "G0",
        "G1",
        "G2",
        "G3"
      ]
    },
    bulge: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        curve1: 'Wire',
    curve2: 'Wire',
    point1: 'Point',
    point2: 'Point'
  },

  outputs: {
        blendCurve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'blendCurve',
      params: {
        curve1: inputs.curve1,
        curve2: inputs.curve2,
        point1: inputs.point1,
        point2: inputs.point2,
        continuityStart: params.continuityStart,
        continuityEnd: params.continuityEnd,
        bulge: params.bulge
      }
    });

    return {
      blendCurve: result
    };
  }
};
