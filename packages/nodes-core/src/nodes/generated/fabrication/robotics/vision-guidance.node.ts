
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cameraType: string;
  patternType: string;
}
interface Inputs {
  targetFeatures: Shape[];
}
interface Outputs {
  detectedPoses: Transform[];
}

export const VisionGuidanceNode: NodeDefinition<VisionGuidanceInputs, VisionGuidanceOutputs, VisionGuidanceParams> = {
  type: 'Fabrication::VisionGuidance',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'VisionGuidance',
    description: 'Vision-guided robotics',
    
    
  },

  params: {
        cameraType: {
      "default": "3d",
      "options": [
        "2d",
        "3d",
        "stereo"
      ]
    },
    patternType: {
      "default": "aruco",
      "options": [
        "checkerboard",
        "aruco",
        "feature"
      ]
    }
  },

  inputs: {
        targetFeatures: 'Shape[]'
  },

  outputs: {
        detectedPoses: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'visionGuidance',
      params: {
        targetFeatures: inputs.targetFeatures,
        cameraType: params.cameraType,
        patternType: params.patternType
      }
    });

    return {
      detectedPoses: result
    };
  }
};
