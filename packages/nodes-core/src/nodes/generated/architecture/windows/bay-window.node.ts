
import { NodeDefinition } from '@brepflow/types';

interface Params {
  projection: number;
  angleCount: number;
  centerAngle: number;
}
interface Inputs {
  wallOpening: Wire;
}
interface Outputs {
  bayWindow: Shape;
  windows: Shape[];
}

export const BayWindowNode: NodeDefinition<BayWindowInputs, BayWindowOutputs, BayWindowParams> = {
  type: 'Architecture::BayWindow',
  category: 'Architecture',
  subcategory: 'Windows',

  metadata: {
    label: 'BayWindow',
    description: 'Bay window projection',
    
    
  },

  params: {
        projection: {
      "default": 600,
      "min": 400,
      "max": 1200
    },
    angleCount: {
      "default": 3,
      "min": 3,
      "max": 5,
      "step": 1
    },
    centerAngle: {
      "default": 135,
      "min": 90,
      "max": 180
    }
  },

  inputs: {
        wallOpening: 'Wire'
  },

  outputs: {
        bayWindow: 'Shape',
    windows: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'bayWindow',
      params: {
        wallOpening: inputs.wallOpening,
        projection: params.projection,
        angleCount: params.angleCount,
        centerAngle: params.centerAngle
      }
    });

    return {
      bayWindow: result,
      windows: result
    };
  }
};
