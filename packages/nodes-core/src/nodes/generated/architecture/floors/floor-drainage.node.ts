
import { NodeDefinition } from '@brepflow/types';

interface Params {
  slope: number;
  drainType: string;
}
interface Inputs {
  floorBoundary: Wire;
  drainLocations: Point[];
}
interface Outputs {
  slopedFloor: Shape;
  drains: Shape[];
}

export const FloorDrainageNode: NodeDefinition<FloorDrainageInputs, FloorDrainageOutputs, FloorDrainageParams> = {
  type: 'Architecture::FloorDrainage',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'FloorDrainage',
    description: 'Floor drainage system',
    
    
  },

  params: {
        slope: {
      "default": 0.01,
      "min": 0.005,
      "max": 0.02
    },
    drainType: {
      "default": "point",
      "options": [
        "point",
        "linear",
        "area"
      ]
    }
  },

  inputs: {
        floorBoundary: 'Wire',
    drainLocations: 'Point[]'
  },

  outputs: {
        slopedFloor: 'Shape',
    drains: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'floorDrainage',
      params: {
        floorBoundary: inputs.floorBoundary,
        drainLocations: inputs.drainLocations,
        slope: params.slope,
        drainType: params.drainType
      }
    });

    return {
      slopedFloor: result,
      drains: result
    };
  }
};
