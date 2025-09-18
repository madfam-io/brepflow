
import { NodeDefinition } from '@brepflow/types';

interface Params {
  conveyorSpeed: number;
  trackingWindow: number;
}
interface Inputs {
  objectPositions: Point[];
}
interface Outputs {
  trackingTrajectory: Transform[];
}

export const ConveyorTrackingNode: NodeDefinition<ConveyorTrackingInputs, ConveyorTrackingOutputs, ConveyorTrackingParams> = {
  type: 'Fabrication::ConveyorTracking',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'ConveyorTracking',
    description: 'Moving conveyor tracking',
    
    
  },

  params: {
        conveyorSpeed: {
      "default": 100,
      "min": 1,
      "max": 1000
    },
    trackingWindow: {
      "default": 500,
      "min": 100,
      "max": 2000
    }
  },

  inputs: {
        objectPositions: 'Point[]'
  },

  outputs: {
        trackingTrajectory: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'conveyorTracking',
      params: {
        objectPositions: inputs.objectPositions,
        conveyorSpeed: params.conveyorSpeed,
        trackingWindow: params.trackingWindow
      }
    });

    return {
      trackingTrajectory: result
    };
  }
};
