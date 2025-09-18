
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
  bendRadius: number;
  flangePosition: string;
}
interface Inputs {
  sheet: Shape;
  contour: Wire;
  profile?: Wire;
}
interface Outputs {
  result: Shape;
}

export const ContourFlangeNode: NodeDefinition<ContourFlangeInputs, ContourFlangeOutputs, ContourFlangeParams> = {
  type: 'SheetMetal::ContourFlange',
  category: 'SheetMetal',
  subcategory: 'Flanges',

  metadata: {
    label: 'ContourFlange',
    description: 'Create flange from sketch contour',
    
    
  },

  params: {
        angle: {
      "default": 90,
      "min": 0,
      "max": 180
    },
    bendRadius: {
      "default": 3,
      "min": 0.1,
      "max": 100
    },
    flangePosition: {
      "default": "material-inside",
      "options": [
        "material-inside",
        "bend-outside",
        "material-outside"
      ]
    }
  },

  inputs: {
        sheet: 'Shape',
    contour: 'Wire',
    profile: 'Wire'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetContourFlange',
      params: {
        sheet: inputs.sheet,
        contour: inputs.contour,
        profile: inputs.profile,
        angle: params.angle,
        bendRadius: params.bendRadius,
        flangePosition: params.flangePosition
      }
    });

    return {
      result: result
    };
  }
};
