
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  showConnection: boolean;
}
interface Inputs {
  geometry1: Shape;
  geometry2: Shape;
}
interface Outputs {
  distance: number;
  point1: Point;
  point2: Point;
  connectionLine: Wire;
}

export const MinimumDistanceNode: NodeDefinition<MinimumDistanceInputs, MinimumDistanceOutputs, MinimumDistanceParams> = {
  type: 'Analysis::MinimumDistance',
  category: 'Analysis',
  subcategory: 'Proximity',

  metadata: {
    label: 'MinimumDistance',
    description: 'Find minimum distance between geometries',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showConnection: {
      "default": true
    }
  },

  inputs: {
        geometry1: 'Shape',
    geometry2: 'Shape'
  },

  outputs: {
        distance: 'number',
    point1: 'Point',
    point2: 'Point',
    connectionLine: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'minimumDistance',
      params: {
        geometry1: inputs.geometry1,
        geometry2: inputs.geometry2,
        tolerance: params.tolerance,
        showConnection: params.showConnection
      }
    });

    return {
      distance: result,
      point1: result,
      point2: result,
      connectionLine: result
    };
  }
};
