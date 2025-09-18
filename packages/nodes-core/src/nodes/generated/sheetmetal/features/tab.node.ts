
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tabWidth: number;
  tabDepth: number;
  tabType: string;
  cornerRadius: number;
}
interface Inputs {
  sheet: Shape;
  edge: Edge;
  position: Point;
}
interface Outputs {
  result: Shape;
}

export const TabNode: NodeDefinition<TabInputs, TabOutputs, TabParams> = {
  type: 'SheetMetal::Tab',
  category: 'SheetMetal',
  subcategory: 'Features',

  metadata: {
    label: 'Tab',
    description: 'Create tab feature',
    
    
  },

  params: {
        tabWidth: {
      "default": 20,
      "min": 0.1,
      "max": 500
    },
    tabDepth: {
      "default": 10,
      "min": 0.1,
      "max": 100
    },
    tabType: {
      "default": "rectangular",
      "options": [
        "rectangular",
        "rounded",
        "trapezoidal"
      ]
    },
    cornerRadius: {
      "default": 2,
      "min": 0,
      "max": 50
    }
  },

  inputs: {
        sheet: 'Shape',
    edge: 'Edge',
    position: 'Point'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetTab',
      params: {
        sheet: inputs.sheet,
        edge: inputs.edge,
        position: inputs.position,
        tabWidth: params.tabWidth,
        tabDepth: params.tabDepth,
        tabType: params.tabType,
        cornerRadius: params.cornerRadius
      }
    });

    return {
      result: result
    };
  }
};
