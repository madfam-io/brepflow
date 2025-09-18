
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pitch: number;
  height: number;
  turns: number;
  radius: number;
  leftHanded: boolean;
  taper: number;
}
interface Inputs {
  profile: Wire;
  axis?: Axis;
}
interface Outputs {
  shape: Shape;
}

export const HelicalSweepNode: NodeDefinition<HelicalSweepInputs, HelicalSweepOutputs, HelicalSweepParams> = {
  type: 'Advanced::HelicalSweep',
  category: 'Advanced',
  subcategory: 'Sweep',

  metadata: {
    label: 'HelicalSweep',
    description: 'Sweep profile along helix',
    
    
  },

  params: {
        pitch: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    turns: {
      "default": 5,
      "min": 0.1,
      "max": 1000
    },
    radius: {
      "default": 20,
      "min": 0.1,
      "max": 10000
    },
    leftHanded: {
      "default": false
    },
    taper: {
      "default": 0,
      "min": -45,
      "max": 45
    }
  },

  inputs: {
        profile: 'Wire',
    axis: 'Axis'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'helicalSweep',
      params: {
        profile: inputs.profile,
        axis: inputs.axis,
        pitch: params.pitch,
        height: params.height,
        turns: params.turns,
        radius: params.radius,
        leftHanded: params.leftHanded,
        taper: params.taper
      }
    });

    return {
      shape: result
    };
  }
};
