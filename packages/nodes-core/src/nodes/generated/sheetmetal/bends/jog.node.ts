
import { NodeDefinition } from '@brepflow/types';

interface Params {
  jogOffset: number;
  jogAngle: number;
  bendRadius: number;
}
interface Inputs {
  sheet: Shape;
  jogLine: Edge;
}
interface Outputs {
  result: Shape;
}

export const JogNode: NodeDefinition<JogInputs, JogOutputs, JogParams> = {
  type: 'SheetMetal::Jog',
  category: 'SheetMetal',
  subcategory: 'Bends',

  metadata: {
    label: 'Jog',
    description: 'Create jog offset in sheet',
    
    
  },

  params: {
        jogOffset: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    jogAngle: {
      "default": 90,
      "min": 0,
      "max": 180
    },
    bendRadius: {
      "default": 3,
      "min": 0.1,
      "max": 100
    }
  },

  inputs: {
        sheet: 'Shape',
    jogLine: 'Edge'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetJog',
      params: {
        sheet: inputs.sheet,
        jogLine: inputs.jogLine,
        jogOffset: params.jogOffset,
        jogAngle: params.jogAngle,
        bendRadius: params.bendRadius
      }
    });

    return {
      result: result
    };
  }
};
