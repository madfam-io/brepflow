
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  angle: number;
  miterAngle: number;
  bendRadius: number;
}
interface Inputs {
  sheet: Shape;
  edges: Edge[];
}
interface Outputs {
  result: Shape;
}

export const MiterFlangeNode: NodeDefinition<MiterFlangeInputs, MiterFlangeOutputs, MiterFlangeParams> = {
  type: 'SheetMetal::MiterFlange',
  category: 'SheetMetal',
  subcategory: 'Flanges',

  metadata: {
    label: 'MiterFlange',
    description: 'Create mitered flange',
    
    
  },

  params: {
        height: {
      "default": 25,
      "min": 0.1,
      "max": 1000
    },
    angle: {
      "default": 90,
      "min": 0,
      "max": 180
    },
    miterAngle: {
      "default": 45,
      "min": 0,
      "max": 90
    },
    bendRadius: {
      "default": 3,
      "min": 0.1,
      "max": 100
    }
  },

  inputs: {
        sheet: 'Shape',
    edges: 'Edge[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetMiterFlange',
      params: {
        sheet: inputs.sheet,
        edges: inputs.edges,
        height: params.height,
        angle: params.angle,
        miterAngle: params.miterAngle,
        bendRadius: params.bendRadius
      }
    });

    return {
      result: result
    };
  }
};
