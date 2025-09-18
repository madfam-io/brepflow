
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
  bendRadius: number;
  bendDirection: string;
  bendAllowance: number;
}
interface Inputs {
  sheet: Shape;
  bendLine: Edge;
}
interface Outputs {
  result: Shape;
}

export const SketchedBendNode: NodeDefinition<SketchedBendInputs, SketchedBendOutputs, SketchedBendParams> = {
  type: 'SheetMetal::SketchedBend',
  category: 'SheetMetal',
  subcategory: 'Bends',

  metadata: {
    label: 'SketchedBend',
    description: 'Create bend from sketch line',
    
    
  },

  params: {
        angle: {
      "default": 90,
      "min": -180,
      "max": 180
    },
    bendRadius: {
      "default": 3,
      "min": 0.1,
      "max": 100
    },
    bendDirection: {
      "default": "up",
      "options": [
        "up",
        "down"
      ]
    },
    bendAllowance: {
      "default": 0,
      "min": -10,
      "max": 10
    }
  },

  inputs: {
        sheet: 'Shape',
    bendLine: 'Edge'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetSketchedBend',
      params: {
        sheet: inputs.sheet,
        bendLine: inputs.bendLine,
        angle: params.angle,
        bendRadius: params.bendRadius,
        bendDirection: params.bendDirection,
        bendAllowance: params.bendAllowance
      }
    });

    return {
      result: result
    };
  }
};
