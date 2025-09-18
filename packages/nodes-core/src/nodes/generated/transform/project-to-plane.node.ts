
import { NodeDefinition } from '@brepflow/types';

interface Params {
  planeOriginX: number;
  planeOriginY: number;
  planeOriginZ: number;
  planeNormalX: number;
  planeNormalY: number;
  planeNormalZ: number;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  projected: Shape;
}

export const ProjectToPlaneNode: NodeDefinition<ProjectToPlaneInputs, ProjectToPlaneOutputs, ProjectToPlaneParams> = {
  type: 'Transform::ProjectToPlane',
  category: 'Transform',
  

  metadata: {
    label: 'ProjectToPlane',
    description: 'Project shape onto a plane',
    
    
  },

  params: {
        planeOriginX: {
      "default": 0
    },
    planeOriginY: {
      "default": 0
    },
    planeOriginZ: {
      "default": 0
    },
    planeNormalX: {
      "default": 0
    },
    planeNormalY: {
      "default": 0
    },
    planeNormalZ: {
      "default": 1
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        projected: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformProject',
      params: {
        shape: inputs.shape,
        planeOriginX: params.planeOriginX,
        planeOriginY: params.planeOriginY,
        planeOriginZ: params.planeOriginZ,
        planeNormalX: params.planeNormalX,
        planeNormalY: params.planeNormalY,
        planeNormalZ: params.planeNormalZ
      }
    });

    return {
      projected: result
    };
  }
};
