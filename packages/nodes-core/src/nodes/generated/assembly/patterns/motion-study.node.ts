
import { NodeDefinition } from '@brepflow/types';

interface Params {
  steps: number;
  duration: number;
}
interface Inputs {
  assembly: Assembly;
  drivers: Driver[];
}
interface Outputs {
  frames: Frame[];
  collisions: Collision[];
}

export const MotionStudyNode: NodeDefinition<MotionStudyInputs, MotionStudyOutputs, MotionStudyParams> = {
  type: 'Assembly::MotionStudy',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'MotionStudy',
    description: 'Analyze assembly motion',
    
    
  },

  params: {
        steps: {
      "default": 10,
      "min": 2,
      "max": 100
    },
    duration: {
      "default": 1,
      "min": 0.1,
      "max": 100
    }
  },

  inputs: {
        assembly: 'Assembly',
    drivers: 'Driver[]'
  },

  outputs: {
        frames: 'Frame[]',
    collisions: 'Collision[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyMotion',
      params: {
        assembly: inputs.assembly,
        drivers: inputs.drivers,
        steps: params.steps,
        duration: params.duration
      }
    });

    return {
      frames: result,
      collisions: result
    };
  }
};
