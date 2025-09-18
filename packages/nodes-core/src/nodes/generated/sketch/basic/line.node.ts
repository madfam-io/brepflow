
import { NodeDefinition } from '@brepflow/types';

interface Params {
  startX: number;
  startY: number;
  startZ: number;
  endX: number;
  endY: number;
  endZ: number;
}
type Inputs = {};
interface Outputs {
  edge: Edge;
}

export const LineNode: NodeDefinition<LineInputs, LineOutputs, LineParams> = {
  type: 'Sketch::Line',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Line',
    description: 'Create a line segment',
    
    
  },

  params: {
        startX: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    startY: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    startZ: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    endX: {
      "default": 100,
      "min": -10000,
      "max": 10000
    },
    endY: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    endZ: {
      "default": 0,
      "min": -10000,
      "max": 10000
    }
  },

  inputs: {
    
  },

  outputs: {
        edge: 'Edge'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeLine',
      params: {
        
        startX: params.startX,
        startY: params.startY,
        startZ: params.startZ,
        endX: params.endX,
        endY: params.endY,
        endZ: params.endZ
      }
    });

    return {
      edge: result
    };
  }
};
