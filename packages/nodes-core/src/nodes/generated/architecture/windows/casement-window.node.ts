
import { NodeDefinition } from '@brepflow/types';

interface Params {
  width: number;
  height: number;
  hinge: string;
  opening: number;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  window: Shape;
  frame: Shape;
  glass: Face;
}

export const CasementWindowNode: NodeDefinition<CasementWindowInputs, CasementWindowOutputs, CasementWindowParams> = {
  type: 'Architecture::CasementWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'CasementWindow',
    description: 'Casement window',
    
    
  },

  params: {
        width: {
      "default": 600,
      "min": 400,
      "max": 1200
    },
    height: {
      "default": 1200,
      "min": 600,
      "max": 2000
    },
    hinge: {
      "default": "left",
      "options": [
        "left",
        "right",
        "top"
      ]
    },
    opening: {
      "default": 0,
      "min": 0,
      "max": 90
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        window: 'Shape',
    frame: 'Shape',
    glass: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'casementWindow',
      params: {
        position: inputs.position,
        width: params.width,
        height: params.height,
        hinge: params.hinge,
        opening: params.opening
      }
    });

    return {
      window: result,
      frame: result,
      glass: result
    };
  }
};
