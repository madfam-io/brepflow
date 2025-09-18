
import { NodeDefinition } from '@brepflow/types';

interface Params {
  centerX: number;
  centerY: number;
  centerZ: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}
type Inputs = {};
interface Outputs {
  edge: Edge;
}

export const ArcNode: NodeDefinition<ArcInputs, ArcOutputs, ArcParams> = {
  type: 'Sketch::Arc',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Arc',
    description: 'Create a circular arc',
    
    
  },

  params: {
        centerX: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    centerY: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    centerZ: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    radius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    startAngle: {
      "default": 0,
      "min": 0,
      "max": 360,
      "description": "Start angle in degrees"
    },
    endAngle: {
      "default": 90,
      "min": 0,
      "max": 360,
      "description": "End angle in degrees"
    }
  },

  inputs: {
    
  },

  outputs: {
        edge: 'Edge'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeArc',
      params: {
        
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        radius: params.radius,
        startAngle: params.startAngle,
        endAngle: params.endAngle
      }
    });

    return {
      edge: result
    };
  }
};
