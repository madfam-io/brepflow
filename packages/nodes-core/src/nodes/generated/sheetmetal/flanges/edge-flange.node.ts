
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  angle: number;
  bendRadius: number;
  bendRelief: string;
  reliefRatio: number;
}
interface Inputs {
  sheet: Shape;
  edge: Edge;
}
interface Outputs {
  result: Shape;
}

export const EdgeFlangeNode: NodeDefinition<EdgeFlangeInputs, EdgeFlangeOutputs, EdgeFlangeParams> = {
  type: 'SheetMetal::EdgeFlange',
  category: 'SheetMetal',
  subcategory: 'Flanges',

  metadata: {
    label: 'EdgeFlange',
    description: 'Create flange from edge',
    
    
  },

  params: {
        height: {
      "default": 25,
      "min": 0.1,
      "max": 1000,
      "description": "Flange height"
    },
    angle: {
      "default": 90,
      "min": 0,
      "max": 180,
      "description": "Bend angle in degrees"
    },
    bendRadius: {
      "default": 3,
      "min": 0.1,
      "max": 100,
      "description": "Bend radius"
    },
    bendRelief: {
      "default": "rectangular",
      "options": [
        "rectangular",
        "obround",
        "tear"
      ]
    },
    reliefRatio: {
      "default": 0.5,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        sheet: 'Shape',
    edge: 'Edge'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetEdgeFlange',
      params: {
        sheet: inputs.sheet,
        edge: inputs.edge,
        height: params.height,
        angle: params.angle,
        bendRadius: params.bendRadius,
        bendRelief: params.bendRelief,
        reliefRatio: params.reliefRatio
      }
    });

    return {
      result: result
    };
  }
};
