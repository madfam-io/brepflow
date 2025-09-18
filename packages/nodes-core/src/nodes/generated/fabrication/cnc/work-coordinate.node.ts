
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wcs: string;
}
interface Inputs {
  origin: Point;
  orientation?: Transform;
}
interface Outputs {
  coordinate: Transform;
}

export const WorkCoordinateNode: NodeDefinition<WorkCoordinateInputs, WorkCoordinateOutputs, WorkCoordinateParams> = {
  type: 'Fabrication::WorkCoordinate',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'WorkCoordinate',
    description: 'Work coordinate system',
    
    
  },

  params: {
        wcs: {
      "default": "G54",
      "options": [
        "G54",
        "G55",
        "G56",
        "G57",
        "G58",
        "G59"
      ]
    }
  },

  inputs: {
        origin: 'Point',
    orientation: 'Transform'
  },

  outputs: {
        coordinate: 'Transform'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'workCoordinate',
      params: {
        origin: inputs.origin,
        orientation: inputs.orientation,
        wcs: params.wcs
      }
    });

    return {
      coordinate: result
    };
  }
};
