
import { NodeDefinition } from '@brepflow/types';

interface Params {
  stiffness: number;
  damping: number;
}
interface Inputs {
  current: number;
  target: number;
  velocity: number;
  deltaTime: number;
}
interface Outputs {
  position: number;
  velocity: number;
}

export const SpringInterpNode: NodeDefinition<SpringInterpInputs, SpringInterpOutputs, SpringInterpParams> = {
  type: 'Math::SpringInterp',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'SpringInterp',
    description: 'Spring interpolation',
    
    
  },

  params: {
        stiffness: {
      "default": 100,
      "min": 1,
      "max": 1000
    },
    damping: {
      "default": 10,
      "min": 0,
      "max": 100
    }
  },

  inputs: {
        current: 'number',
    target: 'number',
    velocity: 'number',
    deltaTime: 'number'
  },

  outputs: {
        position: 'number',
    velocity: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathSpringInterp',
      params: {
        current: inputs.current,
        target: inputs.target,
        velocity: inputs.velocity,
        deltaTime: inputs.deltaTime,
        stiffness: params.stiffness,
        damping: params.damping
      }
    });

    return {
      position: result,
      velocity: result
    };
  }
};
