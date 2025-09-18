
import { NodeDefinition } from '@brepflow/types';

interface Params {
  closed: boolean;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  wire: Wire;
}

export const PolylineNode: NodeDefinition<PolylineInputs, PolylineOutputs, PolylineParams> = {
  type: 'Sketch::Polyline',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Polyline',
    description: 'Create a polyline from points',
    
    
  },

  params: {
        closed: {
      "default": false,
      "description": "Close the polyline"
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        wire: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makePolyline',
      params: {
        points: inputs.points,
        closed: params.closed
      }
    });

    return {
      wire: result
    };
  }
};
