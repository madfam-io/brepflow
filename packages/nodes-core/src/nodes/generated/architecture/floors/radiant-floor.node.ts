
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pipeSpacing: number;
  pipeDialeter: number;
  zoneCount: number;
}
interface Inputs {
  floorArea: Face;
}
interface Outputs {
  radiantLayout: Wire[];
  manifold: Point;
}

export const RadiantFloorNode: NodeDefinition<RadiantFloorInputs, RadiantFloorOutputs, RadiantFloorParams> = {
  type: 'Architecture::RadiantFloor',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'RadiantFloor',
    description: 'In-floor radiant heating',
    
    
  },

  params: {
        pipeSpacing: {
      "default": 200,
      "min": 150,
      "max": 300
    },
    pipeDialeter: {
      "default": 16,
      "min": 12,
      "max": 25
    },
    zoneCount: {
      "default": 1,
      "min": 1,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        floorArea: 'Face'
  },

  outputs: {
        radiantLayout: 'Wire[]',
    manifold: 'Point'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'radiantFloor',
      params: {
        floorArea: inputs.floorArea,
        pipeSpacing: params.pipeSpacing,
        pipeDialeter: params.pipeDialeter,
        zoneCount: params.zoneCount
      }
    });

    return {
      radiantLayout: result,
      manifold: result
    };
  }
};
