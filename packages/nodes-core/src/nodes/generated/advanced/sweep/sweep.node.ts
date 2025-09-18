
import { NodeDefinition } from '@brepflow/types';

interface Params {
  twistAngle: number;
  scaleFactor: number;
  keepOrientation: boolean;
  solid: boolean;
}
interface Inputs {
  profile: Wire;
  path: Wire;
  auxiliarySpine?: Wire;
}
interface Outputs {
  shape: Shape;
}

export const SweepNode: NodeDefinition<SweepInputs, SweepOutputs, SweepParams> = {
  type: 'Advanced::Sweep',
  category: 'Advanced',
  subcategory: 'Sweep',

  metadata: {
    label: 'Sweep',
    description: 'Sweep profile along path',
    
    
  },

  params: {
        twistAngle: {
      "default": 0,
      "min": -360,
      "max": 360,
      "description": "Twist along path"
    },
    scaleFactor: {
      "default": 1,
      "min": 0.01,
      "max": 100,
      "description": "Scale at end"
    },
    keepOrientation: {
      "default": false
    },
    solid: {
      "default": true,
      "description": "Create solid or surface"
    }
  },

  inputs: {
        profile: 'Wire',
    path: 'Wire',
    auxiliarySpine: 'Wire'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sweep',
      params: {
        profile: inputs.profile,
        path: inputs.path,
        auxiliarySpine: inputs.auxiliarySpine,
        twistAngle: params.twistAngle,
        scaleFactor: params.scaleFactor,
        keepOrientation: params.keepOrientation,
        solid: params.solid
      }
    });

    return {
      shape: result
    };
  }
};
