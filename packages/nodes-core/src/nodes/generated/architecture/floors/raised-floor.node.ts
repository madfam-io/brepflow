
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  panelSize: number;
  loadRating: number;
}
interface Inputs {
  roomBoundary: Wire;
}
interface Outputs {
  raisedFloor: Shape;
  pedestals: Shape[];
  panels: Face[];
}

export const RaisedFloorNode: NodeDefinition<RaisedFloorInputs, RaisedFloorOutputs, RaisedFloorParams> = {
  type: 'Architecture::RaisedFloor',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'RaisedFloor',
    description: 'Raised access floor system',
    
    
  },

  params: {
        height: {
      "default": 300,
      "min": 150,
      "max": 600
    },
    panelSize: {
      "default": 600,
      "min": 500,
      "max": 1200
    },
    loadRating: {
      "default": 1250,
      "min": 500,
      "max": 2000
    }
  },

  inputs: {
        roomBoundary: 'Wire'
  },

  outputs: {
        raisedFloor: 'Shape',
    pedestals: 'Shape[]',
    panels: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'raisedFloor',
      params: {
        roomBoundary: inputs.roomBoundary,
        height: params.height,
        panelSize: params.panelSize,
        loadRating: params.loadRating
      }
    });

    return {
      raisedFloor: result,
      pedestals: result,
      panels: result
    };
  }
};
