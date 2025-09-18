
import { NodeDefinition } from '@brepflow/types';

interface Params {
  operation: string;
  radius: number;
  neighbors: number;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  processed: Point[];
  normals: Vector[];
  indices: number[];
}

export const PointCloudProcessingNode: NodeDefinition<PointCloudProcessingInputs, PointCloudProcessingOutputs, PointCloudProcessingParams> = {
  type: 'Algorithmic::PointCloudProcessing',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'PointCloudProcessing',
    description: 'Process and filter point clouds',
    
    
  },

  params: {
        operation: {
      "default": "filter",
      "options": [
        "filter",
        "downsample",
        "normal",
        "cluster"
      ]
    },
    radius: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    neighbors: {
      "default": 6,
      "min": 3,
      "max": 50
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        processed: 'Point[]',
    normals: 'Vector[]',
    indices: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'pointCloudProcessing',
      params: {
        points: inputs.points,
        operation: params.operation,
        radius: params.radius,
        neighbors: params.neighbors
      }
    });

    return {
      processed: result,
      normals: result,
      indices: result
    };
  }
};
