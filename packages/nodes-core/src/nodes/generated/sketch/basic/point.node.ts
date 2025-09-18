
import { NodeDefinition } from '@brepflow/types';

interface Params {
  x: number;
  y: number;
  z: number;
}
type Inputs = {};
interface Outputs {
  point: Point;
}

export const PointNode: NodeDefinition<PointInputs, PointOutputs, PointParams> = {
  type: 'Sketch::Point',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Point',
    description: 'Create a point',
    
    
  },

  params: {
        x: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    y: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    z: {
      "default": 0,
      "min": -10000,
      "max": 10000
    }
  },

  inputs: {
    
  },

  outputs: {
        point: 'Point'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makePoint',
      params: {
        
        x: params.x,
        y: params.y,
        z: params.z
      }
    });

    return {
      point: result
    };
  }
};
